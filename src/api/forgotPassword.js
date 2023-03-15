import {CONFIRM_OTP, FORGOT_PASS, RESET_PASSWORD} from './baseURL';
import axios from 'axios';

const forgotPassword = async (params) => {
  return await axios({
    method: 'POST',
    url: FORGOT_PASS + params.email,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const verifiedOTP = async (params) => {
  return await axios({
    method: 'POST',
    url: CONFIRM_OTP + params.otp,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const resetPassword = async (params) => {
  return await axios({
    method: 'POST',
    url: RESET_PASSWORD,
    data: {
      token: params.token,
      password: params.password,
      confirmPassword: params.confirmPassword,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export {forgotPassword, verifiedOTP, resetPassword};
