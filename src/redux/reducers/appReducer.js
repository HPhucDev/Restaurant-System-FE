import {
  ADD_FOOD,
  UPDATE_FOOD,
  DELETE_FOOD,
  LOAD_USER,
  SIGN_OUT,
  LOAD_FOOD,
  LOAD_ORDER,
} from '../actions/type';

let data = [];

const findIndex = (foods, idSend) => {
  let index = -1;
  for (let i = 0; i < foods.length; i++) {
    if (foods[i].id === idSend) {
      return i;
    }
  }
  return index;
};

export const foodReducer = (state = data, action) => {
  let index = -1;
  switch (action.type) {
    case ADD_FOOD:
      index = findIndex(state, action.payload.id);
      if (index == -1) {
        state.push(action.payload);
      } else {
        state[index].quantity += action.payload.quantity;
      }
      return [...state];
    case UPDATE_FOOD:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return (item = action.payload);
        } else {
          return item;
        }
      });
    case DELETE_FOOD:
      return state.filter((item) => item.id !== action.payload.id);
    case LOAD_FOOD:
      return (state = action.payload);
    default:
      return state;
  }
};

let user = {};
export const userReducer = (state = user, action) => {
  switch (action.type) {
    case LOAD_USER:
      return (state = action.payload);
    case SIGN_OUT:
      return (state = {});
    default:
      return state;
  }
};

let orders = [];

export const loadOrders = (state = orders, action) =>{
  switch (action.type) {
      case LOAD_ORDER:
         return (state = action.payload);
      default:
          return state;
  }
}
