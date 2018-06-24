import * as config from '../../config'
import * as actionTypes from './actionTypes'
import axios from 'axios'

export const setStores = (stores) => {
  return {
    type: actionTypes.SET_STORES,
    stores: stores
  }
}

export const setActualStore = (store) => {
  return {
    type: actionTypes.SET_ACTUAL_STORE,
    store: store
  }
}

export const loadActualStore = (storeId) => {
  return (dispatch) => {
    axios.get(config.API_URL + '/stores/' + storeId)
    .then(response => {
      dispatch(setActualStore(response.data));
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const loadStores = () => {
  return dispatch => {
    axios.get(config.API_URL + '/stores')
    .then(response => {
      dispatch(setStores(response.data));
    })
    .catch(error => {
      console.error(error);
    })
  }
}

