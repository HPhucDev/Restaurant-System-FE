import {combineReducers} from 'redux';
import {foodReducer, userReducer, loadOrders} from './appReducer';

export default combineReducers({
    foods: foodReducer, 
    user: userReducer, 
    orders: loadOrders,
})