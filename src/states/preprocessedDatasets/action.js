export const SET_PREPROCESSED_DATASETS = 'SET_PREPROCESSED_DATASETS';
export const ADD_PREPROCESSED_DATASET = 'ADD_PREPROCESSED_DATASET';
export const DELETE_PREPROCESSED_DATASET = 'DELETE_PREPROCESSED_DATASET';

export const setPreprocessedDatasets = (datasets) => ({
  type: SET_PREPROCESSED_DATASETS,
  payload: datasets,
});

export const addPreprocessedDataset = (dataset) => ({
  type: ADD_PREPROCESSED_DATASET,
  payload: dataset,
});

export const deletePreprocessedDatasetById = (id) => ({
  type: DELETE_PREPROCESSED_DATASET,
  payload: id,
});
