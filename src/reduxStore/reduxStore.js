import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import storesReducer from './stores/reducer.js'
import cartReducer from './cart/reducer.js'

const reduxStore = createStore(combineReducers({
    storesReducer,
    cartReducer
}), applyMiddleware(thunk))

export default reduxStore