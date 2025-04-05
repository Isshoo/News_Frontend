// /src/states/datasetDetail/reducer.js

import {
  SET_DATASET_DETAIL,
  SET_DATASET_DETAIL_LOADING,
  SET_DATASET_PAGE,
} from './action';

const initialState = {
  data: [],
  totalData: 0,
  topicCounts: {},
  totalPages: 0,
  page: 1,
  isLoading: false,
};

const datasetDetailReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_DATASET_DETAIL:
    return {
      ...state,
      data: action.payload.data,
      totalData: action.payload.totalData,
      topicCounts: action.payload.topicCounts,
      totalPages: action.payload.totalPages,
    };
  case SET_DATASET_DETAIL_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };
  case SET_DATASET_PAGE:
    return {
      ...state,
      page: action.payload,
    };
  default:
    return state;
  }
};

export default datasetDetailReducer;
