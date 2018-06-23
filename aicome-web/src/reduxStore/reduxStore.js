import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import storesReducer from './stores/reducer.js'
import cartReducer from './cart/reducer.js'
import ordersReducer from './orders/reducer.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxStore = createStore(
    combineReducers({storesReducer, cartReducer, ordersReducer}), 
    composeEnhancers(applyMiddleware(thunk))
);

export default reduxStore