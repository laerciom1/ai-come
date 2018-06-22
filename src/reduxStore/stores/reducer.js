import * as actionTypes from './actionTypes'

const initialState = {
  stores: [],
  actualStore: {
    name: '',
    menu: {
      sizes: [],
      pastas: [],
      borders: [],
      tastes: []
    }
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SET_STORES: {
      return {
        ...state,
        stores: action.stores
      }
    }

    case actionTypes.SET_ACTUAL_STORE: {
      return {
        ...state,
        actualStore: {
          ...state.actualStore,
          ...action.store
        }
      }
    }

    default: {
      return state
    }
  }
}

export default reducer