import React, { Component } from 'react';
import { Layout, Modal, Carousel, Spin, Icon } from 'antd';
import { Scrollbars } from "react-custom-scrollbars";

import Image from './Image/Image';

import classes from './Gallery.css';


class Gallery extends Component {
    state = {
        images: [],
        active: false,
        toLoad: 0,
        loaded: 0,
    };

    constructor(props) {
        super(props);
        this.gallery = null;
        this.carousel = null;

        let loadPerTime = 3;
        if(window.innerWidth < 720 && window.innerWidth > 576)
            loadPerTime = 2;
        else if(window.innerWidth < 576)
            loadPerTime = 1;

        this.config = {
            galleryHeight: window.innerHeight - 64 - 40,
            loadPerTime: loadPerTime,
        };
    }

    componentDidMount() {
        this.loadImages(0, this.config.loadPerTime, true);
        window.addEventListener('keydown', this.onKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyPress);
    }

    loadImages = (first, last, checkScrollPosition = false) => {
        const images = this.state.images.slice();
        this.setState({toLoad: this.state.toLoad + (last - first)}, () => {
            for(let i = first; i < last; i++)
                images.push({
                    // https://loremflickr.com/
                    url: 'https://loremflickr.com/320/240/dog?lock=' + i,
                    loaded: false,
                    error: false,
                });
            this.setState({
                images: images,
                loading: false,
            }, () => {
                if(checkScrollPosition)
                    this.checkLoad(checkScrollPosition);
            });
        });
    };

    checkLoad = (checkScrollPosition = false) => {
        const scrollHeight = this.gallery.getScrollHeight();
        const clientHeight = this.gallery.getClientHeight();
        const scrollTop = this.gallery.viewScrollTop? this.gallery.viewScrollTop : 0;
        if(scrollHeight - (clientHeight + scrollTop) <= 300 && this.state.toLoad === this.state.loaded)
            this.loadImages(this.state.images.length, this.state.images.length + this.config.loadPerTime, checkScrollPosition);
    };

    setActive = i => {
        this.setState({active: i});
    };

    imageLoaded = (i, error = false) => {
        const images = this.state.images.slice();
        images[i].loaded = true;
        images[i].error = error;
        this.setState({
            images: images,
            loaded: this.state.loaded + 1,
        }, () => {
            this.checkLoad();
        })
    };

    onKeyPress = e => {
        const scrollTop = this.gallery.viewScrollTop? this.gallery.viewScrollTop : 0;
        switch(e.which) {
            default:
                break;
            case 35: // end
                this.gallery.scrollToBottom();
                this.loadImages(this.state.images.length, this.state.images.length + this.config.loadPerTime);
                break;
            case 36: // home
                this.gallery.scrollToTop();
                break;
            case 38: // up
                this.gallery.scrollTop(scrollTop - 50);
                break;
            case 40: // down
                this.gallery.scrollTop(scrollTop + 50);
                this.checkLoad();
                break;
        }
    };

    render() {
        const images = this.state.images.map((img, i) => <Image key={i} src={img.url} loaded={img.loaded} error={img.error} alt={'Gallery'} onClick={() => this.setActive(i)} onLoad={() => this.imageLoaded(i)} onError={() => this.imageLoaded(i, true)}/>);
        return (
            <Layout.Content className={classes.Container}>
                <Scrollbars
                    onScroll={() => this.checkLoad()}
                    autoHide
                    autoHideTimeout={1000}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={this.config.galleryHeight}
                    ref={ref => {this.gallery = ref;}}
                >
                    <div className={classes.Gallery}>
                        {images}
                        { this.state.toLoad > this.state.loaded? <div className={classes.Spin}><Spin size={'large'} indicator={<Icon type="loading" style={{ fontSize: 40 }} spin />}/></div> : null }
                    </div>
                </Scrollbars>
                <Modal
                    visible={this.state.active !== false}
                    onCancel={() => this.setActive(false)}
                    title={"Carousel"}
                    footer={null}
                    destroyOnClose
                >
                    {/*this.carousel.innerSlider.slickNext()*/}
                    <Carousel
                        ref={ref => {this.carousel = ref;}}
                        initialSlide={this.state.active}
                        lazyLoad
                        dots={false}
                    >
                        {this.state.images.map((img, i) => <img key={i} src={img.url} className={classes.CarouselImage} alt={'Carousel'}/>)}
                    </Carousel>
                </Modal>
            </Layout.Content>
        );
    }
}

export default Gallery;
