import axiosClient from './axiosClient';
import axios from 'axios';
import {SIGN_IN} from './baseURL';

const signInApi = async (params) => {
    return axios({
      method: 'POST',
      url: SIGN_IN,
      data: {
        username: params.username,
        password: params.password,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
};


export {
    signInApi,
}