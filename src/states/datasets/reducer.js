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
  selectedDataset: '',
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
    return {
      ...state,
      selectedDataset: action.payload,
    };

  case ADD_DATASET:
    return {
      ...state,
      datasets: [...state.datasets, action.payload],
      selectedDataset: action.payload.id,
    };

  case DELETE_DATASET: {
    const updatedDatasets = state.datasets.filter((dataset) => dataset.id !== action.payload);

    return {
      ...state,
      datasets: updatedDatasets,
      selectedDataset: '',
    };
  }

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
