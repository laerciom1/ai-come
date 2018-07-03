import axios from 'axios';
import * as config from '../config';
import {history} from '../routes.js';

const apiAxios = axios.create();

apiAxios.defaults.baseURL = config.API_URL;

apiAxios.interceptors.request.use( (config) => {
    const token = localStorage.getItem('access_token');
  
    if(token != null) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  
    return config;
  }, (err) => {
    return Promise.reject(err);
  }

);

apiAxios.interceptors.response.use( (response) => {
    return response;
  }, (err) => {

    if(err.response.status === 401){
        console.error('Unathorized Access API - Revoking Token and Redirecting to login page');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_fname');
        localStorage.removeItem('user_lname');
        localStorage.removeItem('access_token');
        history.push('/login');
        return Promise.reject(err);
    } else {
        return Promise.reject(err);
    }
    
  }

);

export default apiAxios;