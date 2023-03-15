import axiosClient from './axiosClient';
import {ORDER, ORDER_DETAILS,ORDER_FIND_BY_USER, ORDER_DETAILS_LIST_FOOD, ORDER_TABLE, ORDER_MERGE_TABLE_NOT_NULL, ORDER_MERGE_TABLE_NULL, ORDER_FIND_BY_CASHIER, PAY} from './baseURL';

const createOrderApi = async (params) => {
    return (await axiosClient())({
      method: 'POST',
      url: ORDER,
      data: {
        idUser: params.idUser,
        tableName: params.tableName,
        note: params.note,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
};

const createOrderDetailApi = async (params) => {
    return (await axiosClient())({
      method: 'POST',
      url: ORDER_DETAILS,
      data: {
        idOrder: params.idOrder,
        idFoodItem: params.idFoodItem,
        quantity: params.quantity,
        note: params.note,
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

const createListOrderDetailApi = async (params) => {
  return (await axiosClient())({
    method: 'POST',
    url: ORDER_DETAILS_LIST_FOOD,
    data: params.listFoodDetailOrder,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const getStatusTableByOrder = async () => {
  return (await axiosClient())({
    method: 'GET',
    url: ORDER_TABLE,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
// const getStatusTableByOrder = async () => {
//   return fetch(ORDER_TABLE, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   })
// }
const getOrderById = async(params) => {
  return (await axiosClient())({
    method: 'GET',
    url: ORDER + params.id ,
  })
  .then((response) => {
    return response;
  })
  .catch((error)=>{
    throw error;
  })
};

const orderFindByUserDate = async (params) => {
  return (await axiosClient())({
    method: 'POST',
    url: ORDER_FIND_BY_USER,
    data: {
      idUser: params.idUser,
      date: params.date,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const orderFindByCashierDate = async (params) => {
  return (await axiosClient())({
    method: 'POST',
    url: ORDER_FIND_BY_CASHIER,
    data: {
      date: params.date,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const orderMergeTableNotNull = async (params) => {
  return (await axiosClient())({
    method: 'POST',
    url: ORDER_MERGE_TABLE_NOT_NULL,
    data: {
      orderList: params.orderList,
      orderRoot: params.orderRoot,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const orderMergeTableNull = async (params) => {
  return (await axiosClient())({
    method: 'POST',
    url: ORDER_MERGE_TABLE_NULL,
    data: {
      orderList: params.orderList,
      orderRoot: params.orderRoot,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const updateStatusOrder = async (params) => {
  return (await axiosClient())({
    method: 'PATCH',
    url: ORDER + params.id,
    params: {
      status: params.status,
    }
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const payment = async (params) =>{
  return (await axiosClient())({
    method: 'PATCH',
    url: PAY,
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
    createOrderApi,
    createOrderDetailApi,
    createListOrderDetailApi,
    getStatusTableByOrder,
    getOrderById,
    orderFindByUserDate,
    orderMergeTableNotNull,
    orderMergeTableNull,
    updateStatusOrder,
    orderFindByCashierDate,
    payment,
}