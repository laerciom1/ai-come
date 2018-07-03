import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import Routes, {history} from './routes.js';

import store from './redux/store'

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Routes/>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
