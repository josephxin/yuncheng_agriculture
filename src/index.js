import 'babel-polyfill';
import 'url-search-params-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import './_diy-antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
