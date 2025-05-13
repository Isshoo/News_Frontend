// /src/states/datasetDetail/reducer.js

import {
  SET_DATASET_DETAIL,
  SET_DATASET_HISTORY_DETAIL,
  RESET_DATASET_DETAIL,
  SET_DATASET_DETAIL_LOADING,
  SET_DATASET_PAGE,
  SET_DATASET_LIMIT,
  ADD_DATA,
  DELETE_DATA,
} from './action';

const initialState = {
  data: [],
  history: [],
  totalData: 0,
  topicCounts: {},
  totalPages: 1,
  currentPage: 1,
  limit: 10,
  loadingDetail: false,
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

  case SET_DATASET_HISTORY_DETAIL:
    return {
      ...state,
      history: action.payload,
    };
  case RESET_DATASET_DETAIL:
    return { ...initialState };
  case SET_DATASET_DETAIL_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };
  case SET_DATASET_PAGE:
    return {
      ...state,
      currentPage: action.payload,
    };
  case SET_DATASET_LIMIT:
    return {
      ...state,
      limit: action.payload,
    };
    // add and delete is array
  case ADD_DATA:
    return {
      ...state,
      data: [...state.data, ...action.payload],
    };
  case DELETE_DATA:
    return {
      ...state,
      data: state.data.filter((item) => !action.payload.includes(item.contentSnippet)),
    };
  default:
    return state;
  }
};

export default datasetDetailReducer;
