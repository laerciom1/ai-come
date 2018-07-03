import * as actionTypes from './actionTypes'

const initialState = {
  orders: [],
  actualOrder: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ORDERS:
      return state

    case actionTypes.LOAD_ORDER:
      return {
        ...state,
        actualOrder: state.orders.find((o) => o.id === action.orderId)
      }

    case actionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.order]
      }

    default:
      return state
  }
}

export default reducer