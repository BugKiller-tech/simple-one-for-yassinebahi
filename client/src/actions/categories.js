import * as Types from './types';
import Api from '../api';


export function fetchedAllCategories(categories) {
  return {
    type: Types.FETCHED_ALL_CATEGORIES,
    categories
  }
}


export const fetchAllCategories = () => dispatch => {
  Api.getAllCategory()
  .then(res => {
    dispatch(fetchedAllCategories(res.data.categories));
  })  
}