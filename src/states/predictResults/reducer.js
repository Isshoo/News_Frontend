// redux/vectorized/reducer.js
import { SET_PREDICT_RESULTS, RESET_PREDICT_RESULTS } from './action';

const initialState = {
  data: [],
  currentPage: 1,
  totalPages: 1,
  totalData: 0,
  limit: 10,
  totalC5: 0,
  totalKnn: 0,
  predictBy: null,
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
      totalC5: action.payload.totalC5,
      totalKnn: action.payload.totalKnn,
      predictBy: action.payload.predictBy,
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
