import axiosClient from './axiosClient';
import {ORDER_DETAILS} from './baseURL';

const updateStatusOrderDetailApi = async (params) => {
  return (await axiosClient())({
    method: 'PATCH',
    url: ORDER_DETAILS,
    params:{
      id: params.id,
    },
    data: {
      status: params.status,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const updateQuantityOrderDetailApi = async (params) => {
  return (await axiosClient())({
    method: 'PATCH',
    url: ORDER_DETAILS,
    params:{
      id: params.id,
    },
    data: {
      quantity: params.quantity,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const deleteOrderDetailApi = async (params) =>{
  return (await axiosClient())({
    method: 'DELETE',
    url: ORDER_DETAILS,
    params:{
      id: params.id,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export {updateStatusOrderDetailApi, updateQuantityOrderDetailApi, deleteOrderDetailApi};
