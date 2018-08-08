import React from 'react';
import { Layout } from 'antd';

import classes from './Header.css';


const header = props => {
    return (
        <Layout.Header className={classes.Header}>
            <div className={classes.Title}>Lazy Gallery</div>
            <div className={classes.Description}>This is a test for a lazy loading gallery</div>
        </Layout.Header>
    );
};

export default header;
