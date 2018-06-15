import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import storesReducer from './stores/reducer.js'

const reduxStore = createStore(combineReducers({
    storesReducer
}), applyMiddleware(thunk))

export default reduxStore