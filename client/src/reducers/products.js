import * as Types from '../actions/types';

const initialState = {
  products: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCHED_ALL_PRODCUTS:
      return {
        ...state,
        products: action.products
      }
    default:
      return state;
  }
}