import * as actionTypes from './actionTypes.js'

export default function(state = {stores:[], actualStore:{}}, action) {
    switch (action.type) {
        case actionTypes.loadAll:
            return  {   ...state,
                        stores:action.stores
                    }
    
        case actionTypes.loadOne:
            return  {   ...state,
                        actualStore: action.actualStore
                    }

        default:
            return state
    }
}