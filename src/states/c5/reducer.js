// redux/c5/reducer.js
import { SET_C5, RESET_C5 } from './action';

const initialState = {
  data: [],
  currentPage: 1,
  totalPages: 0,
  totalData: 0,
  limit: 10,
};

const c5Reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_C5:
    return {
      ...state,
      data: action.payload.data,
      currentPage: action.payload.pagination.currentPage,
      totalPages: action.payload.pagination.totalPages,
      totalData: action.payload.pagination.totalData,
      limit: action.payload.pagination.limit,
    };
  case RESET_C5:
    return {
      ...initialState,
    };
  default:
    return state;
  }
};

export default c5Reducer;
