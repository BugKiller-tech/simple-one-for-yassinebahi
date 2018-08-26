import * as Types from '../actions/types';

const initialState = {
  orders: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCHED_ALL_ORDERS:
      return {
        ...state,
        orders: action.orders
      }
    default:
      return state;
  }
}