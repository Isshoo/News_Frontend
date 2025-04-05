// src/states/datasets/action.js

export const ActionType = {
  SET_DATASETS: 'SET_DATASETS',
  SET_SELECTED_DATASET: 'SET_SELECTED_DATASET',
  SET_DATASETS_LOADING: 'SET_DATASETS_LOADING',
  SET_DATASETS_ERROR: 'SET_DATASETS_ERROR',
};

export const setDatasets = (datasets) => ({
  type: ActionType.SET_DATASETS,
  payload: datasets,
});

export const setSelectedDataset = (dataset) => ({
  type: ActionType.SET_SELECTED_DATASET,
  payload: dataset,
});

export const setDatasetsLoading = (isLoading) => ({
  type: ActionType.SET_DATASETS_LOADING,
  payload: isLoading,
});

export const setDatasetsError = (error) => ({
  type: ActionType.SET_DATASETS_ERROR,
  payload: error,
});
