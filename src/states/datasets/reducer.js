// /src/states/datasets/reducer.js

import {
  SET_DATASETS,
  SET_SELECTED_DATASET,
  ADD_DATASET,
  DELETE_DATASET,
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
  case ADD_DATASET:
    localStorage.setItem('raw_dataset_id', action.payload.id);
    localStorage.removeItem('preprocessed_dataset_id');
    localStorage.removeItem('model_id');
    return {
      ...state,
      datasets: [...state.datasets, action.payload],
      selectedDataset: action.payload.id,
    };
  case DELETE_DATASET:
    localStorage.removeItem('raw_dataset_id');
    localStorage.removeItem('preprocessed_dataset_id');
    localStorage.removeItem('model_id');
    return {
      ...state,
      datasets: state.datasets.filter((dataset) => dataset.id !== action.payload),
      selectedDataset: state.selectedDataset == action.payload ? state.datasets[0].id || 'default-stemming' : state.selectedDataset,
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
