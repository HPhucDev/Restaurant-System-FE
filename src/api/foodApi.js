import axiosClient from './axiosClient';
import {FOOD, FOOD_ITEM, FOOD_ITEMS_NAME, FOOD_ITEMS_TYPE, FOOD_TYPE,} from './baseURL';

const getFoodItemByIdApi = async (params) => {
    return (await axiosClient())({
      method: 'GET',
      url: FOOD_ITEM + params.id,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
};

const getFoodItemByTypeApi = async (params) => {
    return (await axiosClient())({
      method: 'GET',
      url: FOOD_ITEMS_TYPE + params.name,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
};

const getFoodItemByNameApi = async (params) => {
    return (await axiosClient())({
      method: 'GET',
      url: FOOD_ITEMS_NAME + params.name,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
};

const getAllFoodType = async() =>{
  return (await axiosClient())({
    method: 'GET',
    url: FOOD_TYPE
  })
  .then((response) =>{
    return response;
  })
  .catch((error)=>{
    throw error;
  });
};

const getAllFood = async() =>{
  return (await axiosClient())({
    method: 'GET',
    url: FOOD_ITEM
  })
  .then((response) =>{
    return response;
  })
  .catch((error)=>{
    throw error;
  });
};

const addFood = async(params) =>{
  return (await axiosClient())({
    method: 'POST',
    url: FOOD,
    data: params.formData,
  })
  .then((response) =>{
    return response;
  })
  .catch((error)=>{
    throw error;
  });
};

const updateFoodById = async(params) =>{
  return (await axiosClient())({
    method: 'PATCH',
    url: FOOD_ITEM,
    data: params.formData,
    params:{
      id: params.id
    }
  })
  .then((response) =>{
    return response;
  })
  .catch((error)=>{
    throw error;
  });
};

export {
    getFoodItemByIdApi,
    getFoodItemByTypeApi,
    getFoodItemByNameApi,
    getAllFoodType,
    addFood,
    updateFoodById,
    getAllFood,
}