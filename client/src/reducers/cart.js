import * as Types from '../actions/types';

const initialState = {
  products: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [],
  shippingAddr: '',
  phoneNumber: '',
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.UPDATED_USER_CART:
      return {
        ...state,
        products: action.products        
      }
    default:
      return state;
  }
}