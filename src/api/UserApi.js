import axiosClient from './axiosClient';
import { FIND_ALL_USER, RESET_PASSWORD_USER, USERS } from './baseURL';
const updateUser = async (params) => {
    return (await axiosClient())({
      method: 'PATCH',
      url: USERS,
      data: params.formData,
      params:{
        id: params.id,
      }
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
};

const createUser = async (params) =>{
  return (await axiosClient())({
    method: 'POST',
    url: USERS,
    data: params.formData,
  })
  .then((response) =>{
    return response;
  })
  .catch((error)=>{
    throw error;
  })
};

const resetPasswordUser = async (params) =>{
  return (await axiosClient())({
    method: 'POST',
    url: RESET_PASSWORD_USER,
    data: {
      id: params.id,
      newPassword: params.newPassword,
      confirmPassword: params.confirmPassword,
      oldPassword: params.oldPassword,
    },
  })
  .then((response) =>{
    return response;
  })
  .catch((error)=>{
    throw error;
  })
};

const findAllUser = async(params) =>{
  return (await axiosClient())({
    method: 'GET',
    url: FIND_ALL_USER,
  })
  .then((response) =>{
    return response;
  })
  .catch((error)=>{
    throw error;
  })
}

export { updateUser, createUser, resetPasswordUser, findAllUser};