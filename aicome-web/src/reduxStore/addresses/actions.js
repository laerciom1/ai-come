import * as actionTypes from './actionTypes.js'

export const load = () => {
  return {
    type: actionTypes.LOAD_ADDRESSES,
    addresses: []
  }
}

export const setAddress = (addressId) => {
  return {
    type: actionTypes.SET_ADDRESS,
    addressId: addressId
  }
}

export const addAddress = (address) => {
  return {
    type: actionTypes.ADD_ADDRESS,
    address: address
  }
}

export const removeAddress = (addressId) => {
  return {
    type: actionTypes.REMOVE_ADDRESS,
    addressId: addressId
  }
}