import React, { Component } from 'react';
import { Layout } from 'antd';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Gallery from './components/Gallery/Gallery';

class App extends Component {
    render() {
        return (
            <Layout>
                <Header/>
                <Gallery/>
                <Footer/>
            </Layout>
        );
    }
}

export default App;
