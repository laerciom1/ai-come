import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import menus from './sampleObjects/menus.js'
import stores from './sampleObjects/stores.js'


function storesReducer(state = {stores:[], actualStore:{}}, action = {}) {
    if(action.type === 'LOAD_STORES') {
        return {...state, stores:action.stores}
    }

    if(action.type === 'LOAD_STORE') {
        return  {    ...state,
                    actualStore: {
                        ...stores.find((s) => Number(s.id) === Number(action.id)),
                        menu: menus.find((m) => Number(m.store_id) === Number(action.id))
                    }
                }
    }

    if(action.type === 'UNLOAD_STORE') {
        return {...state, menu:{}}
    }

    if(action.type === 'ADD_STORE') {
        return {...state, stores:[...state.stores, action.store]}
    }

    return state
}

function orderReducer(state = {order:[]}, action = {}) {
    return state
}

const store = createStore(combineReducers({
    storesReducer,
    orderReducer
}), applyMiddleware(thunk))

export default store