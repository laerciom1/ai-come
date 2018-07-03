import * as actionTypes from './actionTypes.js'

export const load = () => {
    return {
      type: actionTypes.LOAD_ORDERS
    }
  }
  
  export const loadOrder = (orderId) => {
    return {
      type: actionTypes.LOAD_ORDER,
      orderId: orderId
    }
  }

  export const addOrder = (order) => {
    return {
      type: actionTypes.ADD_ORDER,
      order: order
    }
  }