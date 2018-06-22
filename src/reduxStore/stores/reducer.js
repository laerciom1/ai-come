import * as actionTypes from './actionTypes'

const initialState = {
  stores: [],
  actualStore: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_STORES:
      return {
        ...state,
        stores: action.stores
      }

    case actionTypes.LOAD_STORE:
      return {
        ...state,
        actualStore: action.actualStore
      }
      
    default:
      return state
  }
}

export default reducer