import * as Types from '../actions/types';

const initialState = {
  categories: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCHED_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state;
  }
}