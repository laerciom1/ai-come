import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import Routes, {history} from './routes.js';


import reduxStore from './reduxStore/reduxStore.js'

import axios from 'axios';

axios.interceptors.request.use( (config) => {
    const token = localStorage.getItem('access_token');
  
    if(token != null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  }, (err) => {
    return Promise.reject(err);
  }

);

ReactDOM.render(
    <Provider store={reduxStore}>
        <Router history={history}>
            <Routes/>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
