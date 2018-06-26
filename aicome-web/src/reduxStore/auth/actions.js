import * as config from '../../config'
import qs from 'qs';
import axios from 'axios'
import { history } from '../../routes'

export const login = (username, password) => {
  return () => {

    const basicAuth = {
      username: config.CLIENT_ID,
      password: config.CLIENT_SECRET
    }

    const payloadData = {
      username: username,
      password: password,
      grant_type: 'password'
    }

    const headerData = {
      'content-type': 'application/x-www-form-urlencoded'
    }

    const request = {
      method: 'POST',
      headers: headerData,
      auth: basicAuth,
      data: qs.stringify(payloadData),
      url: config.TOKEN_URL
    }

    axios(request).then(response => {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('username', username);
      history.push('/');
    }).catch(error => {
      console.log(error);
    })
  }
}