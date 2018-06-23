import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import Routes from './routes.js';

import reduxStore from './reduxStore/reduxStore.js'



ReactDOM.render(
    <Provider store={reduxStore}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
