import * as Types from './types';
import Api from '../api';


export function fetchedAllProducts(products) {
  return {
    type: Types.FETCHED_ALL_PRODCUTS,
    products
  }
}


export const fetchAllProducts = () => dispatch => {
  Api.getAllProducts()
  .then(res => {
    dispatch(fetchedAllProducts(res.data.products));
  })  
}