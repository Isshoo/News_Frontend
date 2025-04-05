import {
  SET_PREPROCESSED_DATASETS,
  SET_SELECTED_PREPROCESSED_DATASET,
  ADD_PREPROCESSED_DATASET,
  DELETE_PREPROCESSED_DATASET,
} from './action';

const initialState = {
  preprocessedDatasets: [],
  selectedPreprocessedDataset: localStorage.getItem('preprocessed_dataset_id') || localStorage.getItem('raw_dataset_id'),
  isLoading: false,
};

const preprocessedDatasetsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_PREPROCESSED_DATASETS:
    return {
      ...state,
      preprocessedDatasets: action.payload,
    };
  case SET_SELECTED_PREPROCESSED_DATASET:
    localStorage.setItem('preprocessed_dataset_id', action.payload);
    localStorage.removeItem('model_id');
    return {
      ...state,
      selectedPreprocessedDataset: action.payload,
    };
  case ADD_PREPROCESSED_DATASET:
    localStorage.setItem('preprocessed_dataset_id', action.payload.id);
    localStorage.removeItem('model_id');
    return {
      ...state,
      preprocessedDatasets: [...state.preprocessedDatasets, action.payload],
      selectedPreprocessedDataset: action.payload.id,
    };
  case DELETE_PREPROCESSED_DATASET:
    localStorage.removeItem('preprocessed_dataset_id');
    localStorage.removeItem('model_id');
    return {
      ...state,
      preprocessedDatasets: state.preprocessedDatasets.filter((dataset) => dataset.id !== action.payload),
      selectedPreprocessedDataset:
        state.selectedPreprocessedDataset == action.payload
          ? state.preprocessedDatasets[0].id || localStorage.getItem('raw_dataset_id') : state.selectedPreprocessedDataset,
    };
  default:
    return state;
  }
};

export default preprocessedDatasetsReducer;
