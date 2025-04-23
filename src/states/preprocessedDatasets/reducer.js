import {
  SET_ALL_PREPROCESSED_DATASETS,
  SET_PREPROCESSED_DATASETS,
  SET_SELECTED_PREPROCESSED_DATASET,
  ADD_PREPROCESSED_DATASET,
  DELETE_PREPROCESSED_DATASET,
  SET_PREPROCESSED_DATASET_LOADING,
  SET_PREPROCESS_LOADING
} from './action';

const initialState = {
  allPreprocessedDatasets: [],
  preprocessedDatasets: [],
  selectedPreprocessedDataset: '',
  isLoading: false,
  preprocessLoading: false
};

const preprocessedDatasetsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_PREPROCESSED_DATASETS:
    return {
      ...state,
      preprocessedDatasets: action.payload,
    };

  case SET_ALL_PREPROCESSED_DATASETS:
    return {
      ...state,
      allPreprocessedDatasets: action.payload,
    };

  case SET_SELECTED_PREPROCESSED_DATASET:
    return {
      ...state,
      selectedPreprocessedDataset: action.payload,
    };

  case ADD_PREPROCESSED_DATASET:
    return {
      ...state,
      preprocessedDatasets: [...state.preprocessedDatasets, action.payload],
      selectedPreprocessedDataset: action.payload.id,
    };

  case DELETE_PREPROCESSED_DATASET: {
    const updatedDatasets = state.preprocessedDatasets.filter(
      (dataset) => dataset.id !== action.payload
    );

    return {
      ...state,
      preprocessedDatasets: updatedDatasets,
      selectedPreprocessedDataset: '',
    };
  }

  case SET_PREPROCESSED_DATASET_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };

  case SET_PREPROCESS_LOADING:
    return {
      ...state,
      preprocessLoading: action.payload,
    };

  default:
    return state;
  }
};

export default preprocessedDatasetsReducer;
