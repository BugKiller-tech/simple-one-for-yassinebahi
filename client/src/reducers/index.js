import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import products from './products';
import cart from './cart';
import orders from './orders';

const rootReducer = combineReducers({
  auth,
  categories,
  products,
  cart,
  orders
})

export default rootReducer;