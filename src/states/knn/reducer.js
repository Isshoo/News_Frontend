// redux/knn/reducer.js
import { SET_KNN, RESET_KNN } from './action';

const initialState = {
  modelId: null,
  data: [],
  currentPage: 1,
  totalPages: 0,
  totalData: 0,
  limit: 10,
};

const knnReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_KNN:
    return {
      ...state,
      modelId: action.payload.modelId,
      data: action.payload.data,
      currentPage: action.payload.pagination.currentPage,
      totalPages: action.payload.pagination.totalPages,
      totalData: action.payload.pagination.totalData,
      limit: action.payload.pagination.limit,
    };
  case RESET_KNN:
    return {
      ...initialState,
    };
  default:
    return state;
  }
};

export default knnReducer;
