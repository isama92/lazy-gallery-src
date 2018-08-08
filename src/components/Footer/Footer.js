import React from 'react';
import { Layout, Icon } from 'antd';

import classes from './Footer.css';


const footer = props => {
    return (
        <Layout.Footer className={classes.Footer}>
            <div className={classes.Author}><Icon type={'copyright'}/> Stefano Borzoni</div>
        </Layout.Footer>
    );
};

export default footer;
