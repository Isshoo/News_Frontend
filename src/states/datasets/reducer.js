// src/states/datasets/reducer.js

import { ActionType } from './action';

const initialState = {
  datasets: [],
  selectedDataset: null,
  isLoading: false,
  error: null,
};

const datasetsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case ActionType.SET_DATASETS:
    return {
      ...state,
      datasets: action.payload,
      isLoading: false,
    };
  case ActionType.SET_SELECTED_DATASET:
    return {
      ...state,
      selectedDataset: action.payload,
    };
  case ActionType.SET_DATASETS_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };
  case ActionType.SET_DATASETS_ERROR:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default datasetsReducer;
