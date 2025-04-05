// /src/states/datasets/reducer.js

import {
  SET_DATASETS,
  SET_DATASETS_LOADING,
  SET_SELECTED_DATASET,
} from './action';

const initialState = {
  datasets: [],
  selectedDataset: localStorage.getItem('selectedDataset') || null,
  isLoading: false,
};

const datasetsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_DATASETS:
    return {
      ...state,
      datasets: action.payload,
    };
  case SET_DATASETS_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };
  case SET_SELECTED_DATASET:
    return {
      ...state,
      selectedDataset: action.payload,
    };
  default:
    return state;
  }
};

export default datasetsReducer;
