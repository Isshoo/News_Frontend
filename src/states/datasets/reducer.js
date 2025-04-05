// /src/states/datasets/reducer.js

import {
  SET_DATASETS,
  SET_SELECTED_DATASET,
  SET_DATASETS_LOADING,
  SET_DATASETS_UPLOADING,
} from './action';

const initialState = {
  datasets: [],
  selectedDataset: localStorage.getItem('raw_dataset_id') || 'default-stemming',
  isLoading: false,
  isUploading: false,
};

const datasetsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_DATASETS:
    return {
      ...state,
      datasets: action.payload,
    };
  case SET_SELECTED_DATASET:
    localStorage.setItem('raw_dataset_id', action.payload);
    localStorage.removeItem('preprocessed_dataset_id');
    localStorage.removeItem('model_id');
    return {
      ...state,
      selectedDataset: action.payload,
    };
  case SET_DATASETS_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };
  case SET_DATASETS_UPLOADING:
    return {
      ...state,
      isUploading: action.payload,
    };
  default:
    return state;
  }
};

export default datasetsReducer;
