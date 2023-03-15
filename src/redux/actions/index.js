import {ADD_FOOD, UPDATE_FOOD, DELETE_FOOD, LOAD_USER, SIGN_OUT, LOAD_FOOD, LOAD_ORDER} from './type';

export const addFood = (payload) => ({type: ADD_FOOD, payload});
export const updateFood = (payload) => ({type: UPDATE_FOOD, payload});
export const deleteFood = (payload) => ({type: DELETE_FOOD, payload});
export const loadFood = (payload) => ({type: LOAD_FOOD, payload});

export const loadDataUser = (payload) => ({type: LOAD_USER, payload});
export const signOut = (payload) => ({type: SIGN_OUT, payload});

export const loadOrders = (payload) => ({type: LOAD_ORDER, payload});
