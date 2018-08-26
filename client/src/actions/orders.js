import * as Types from './types';
import Api from '../api';


export function fetchedAllOrders(orders) {
  return {
    type: Types.FETCHED_ALL_ORDERS,
    orders
  }
}


export const fetchAllOrders = () => dispatch => {
  Api.getAllOrders()
  .then(res => {
    dispatch(fetchedAllOrders(res.data.orders))
  })
}
