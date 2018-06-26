import * as actionTypes from './actionTypes'

const initialState = {
  addresses: [],
  actualAddress: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ADDRESSES:
      return {
        addresses: action.addresses,
        actualAddress: {}
      }

    case actionTypes.SET_ADDRESS:
      return {
        ...state,
        actualAddress: state.addresses.find((a) => a.id === action.addressId)
      }

    case actionTypes.ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.address]
      }

    case actionTypes.REMOVE_ADDRESS:
      const ads = state.addresses.filter((a) => a.id !== action.addressId) 
      return {
        ...state,
        addresses: ads
      }

    default:
      return state
  }
}

export default reducer