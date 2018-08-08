import React from 'react';
import { Spin, Icon } from 'antd';

import classes from './Image.css';


const image = props => {
    return (
        <div className={classes.Container}>
            <img
                alt={props.alt}
                onClick={props.onClick}
                onLoad={props.onLoad}
                onError={props.onError}
                src={props.src}
                className={classes.Image}
            />
            { !props.loaded?
                <div className={classes.Placeholder}>
                    <Spin size={'large'}/>
                </div>
            : null }
            { props.error?
                <div className={classes.Placeholder}>
                    <Icon type={'warning'} style={{ fontSize: 60 }}/>
                </div>
                : null }
        </div>
    );
};

export default image;
