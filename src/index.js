import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

import '../node_modules/antd/dist/antd.min.css';
import './global.css';

const app = <App/>;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
