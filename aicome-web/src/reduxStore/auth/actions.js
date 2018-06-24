import * as actionTypes from './actionTypes'
import * as config from '../../config'
import qs from 'qs';
import axios from 'axios'
import {history} from '../../routes'

export const setAuth = (auth) => {
    return {
      type: actionTypes.SET_AUTH,
      auth: auth
    }
  }

export const login = (username, password) => {
    return (dispatch) => {

        const basicAuth = {
            username: config.CLIENT_ID,
            password: config.CLIENT_SECRET
        };

        const payloadData = {
            'username': username,
            'password': password,
            'grant_type': 'password'
        };

        const headerData = {
            'content-type': 'application/x-www-form-urlencoded'
        };

        const request = {
            method: 'POST',
            headers: headerData,
            auth: basicAuth,
            data: qs.stringify(payloadData),
            url: config.TOKEN_URL
        };

        axios(request).then(response => {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('username', username);
            dispatch(setAuth(response.data));
            history.push('/');
        }).catch(error => {
          console.log(error);
        })
      }
}