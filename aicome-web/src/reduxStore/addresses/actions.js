import * as config from '../../config'
import * as actionTypes from './actionTypes'
import axios from 'axios'

export const load = (user_id) => {
  return dispatch => {
    axios.get(config.API_URL + `/users/${user_id}/addresses`)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_ADDRESSES,
        addresses: response.data
      });
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