// /src/states/datasets/action.js

// Action Types
export const SET_DATASETS = 'SET_DATASETS';
export const SET_DATASETS_LOADING = 'SET_DATASETS_LOADING';
export const SET_SELECTED_DATASET = 'SET_SELECTED_DATASET';

// Action Creators
export const setDatasets = (datasets) => ({
  type: SET_DATASETS,
  payload: datasets,
});

export const setDatasetsLoading = (isLoading) => ({
  type: SET_DATASETS_LOADING,
  payload: isLoading,
});

export const setSelectedDataset = (datasetId) => ({
  type: SET_SELECTED_DATASET,
  payload: datasetId,
});
