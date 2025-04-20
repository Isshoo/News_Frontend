// redux/vectorized/reducer.js
import { SET_VECTORIZED, RESET_VECTORIZED } from './action';

const initialState = {
  data: [],
  currentPage: 1,
  totalPages: 1,
  totalData: 0,
  limit: 10,
};

const vectorizedReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_VECTORIZED:
    return {
      ...state,
      data: action.payload.data,
      currentPage: action.payload.pagination.currentPage,
      totalPages: action.payload.pagination.totalPages,
      totalData: action.payload.pagination.totalData,
      limit: action.payload.pagination.limit,
    };
  case RESET_VECTORIZED:
    return {
      ...initialState,
    };
  default:
    return state;
  }
};

export default vectorizedReducer;
