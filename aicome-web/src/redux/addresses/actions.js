import * as actionTypes from './actionTypes'
import axios from '../../axios/api'

export const setAddresses = (addresses) => {
  return {
    type: actionTypes.LOAD_ADDRESSES,
    addresses: addresses
  }
}

export const load = () => {
  return dispatch => {
    axios.get('/me/addresses')
    .then(response => {
      dispatch(setAddresses(response.data));
    })
    .catch(error => {
      console.error(error);
    })
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