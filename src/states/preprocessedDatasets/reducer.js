import {
  SET_PREPROCESSED_DATASETS,
  SET_SELECTED_PREPROCESSED_DATASET,
  ADD_PREPROCESSED_DATASET,
  DELETE_PREPROCESSED_DATASET,
} from './action';

const initialState = {
  preprocessedDatasets: [],
  selectedPreprocessedDataset: '',
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
    const isDeleted = state.selectedPreprocessedDataset === action.payload;
    const nextSelected = isDeleted
      ? (updatedDatasets[0]?.id || null)
      : state.selectedPreprocessedDataset;

    return {
      ...state,
      preprocessedDatasets: updatedDatasets,
      selectedPreprocessedDataset: nextSelected,
    };
  }

  default:
    return state;
  }
};

export default preprocessedDatasetsReducer;
