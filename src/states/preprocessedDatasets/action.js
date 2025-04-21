export const SET_PREPROCESSED_DATASETS = 'SET_PREPROCESSED_DATASETS';
export const SET_SELECTED_PREPROCESSED_DATASET = 'SET_SELECTED_PREPROCESSED_DATASET';
export const ADD_PREPROCESSED_DATASET = 'ADD_PREPROCESSED_DATASET';
export const DELETE_PREPROCESSED_DATASET = 'DELETE_PREPROCESSED_DATASET';
export const SET_PREPROCESS_LOADING = 'SET_PREPROCESS_LOADING';

export const setPreprocessedDatasets = (datasets) => ({
  type: SET_PREPROCESSED_DATASETS,
  payload: datasets,
});

export const setSelectedPreprocessedDataset = (datasetId) => {
  return {
    type: SET_SELECTED_PREPROCESSED_DATASET,
    payload: datasetId,
  };
};

export const addPreprocessedDataset = (dataset) => ({
  type: ADD_PREPROCESSED_DATASET,
  payload: dataset,
});

export const deletePreprocessedDatasetById = (id) => ({
  type: DELETE_PREPROCESSED_DATASET,
  payload: id,
});

export const setPreprocessLoading = (isLoading) => ({
  type: SET_PREPROCESS_LOADING,
  payload: isLoading,
});
