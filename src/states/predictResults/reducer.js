// redux/vectorized/reducer.js
import { SET_PREDICT_RESULTS, RESET_PREDICT_RESULTS } from './action';

const initialState = {
  data: [],
  currentPage: 1,
  totalPages: 1,
  totalData: 0,
  limit: 10,
};

const predictResultsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_PREDICT_RESULTS:
    return {
      ...state,
      data: action.payload.data,
      currentPage: action.payload.pagination.currentPage,
      totalPages: action.payload.pagination.totalPages,
      totalData: action.payload.pagination.totalData,
      limit: action.payload.pagination.limit,
    };
  case RESET_PREDICT_RESULTS:
    return {
      ...initialState,
    };
  default:
    return state;
  }
};

export default predictResultsReducer;
