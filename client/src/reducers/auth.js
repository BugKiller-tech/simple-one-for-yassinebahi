import * as Types from '../actions/types';

const initialState = {
  user: null,

}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.USER_LOGGED_IN:
      return {
        ...state,
        user: action.user
      }
    case Types.USER_LOGGED_OUT:
      return {
        ...state,
        user: null
      }
      break;
    default:
      return state;
  }
}