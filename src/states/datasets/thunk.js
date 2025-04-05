// /src/states/datasets/thunk.js

import {
  setDatasets,
  addDataset,
  deleteDatasetById,
  setDatasetsLoading,
  setSelectedDataset,
  setDatasetsUploading,
} from './action';

import {
  fetchDatasets,
  uploadDataset,
  deleteDataset,
} from '../../utils/api/dataset';

// Thunk: Fetch all datasets
export const asyncFetchDatasets = () => async (dispatch) => {
  dispatch(setDatasetsLoading(true));
  const result = await fetchDatasets();
  if (!result.error) {
    dispatch(setDatasets(result));
  }
  dispatch(setDatasetsLoading(false));
  return result;
};

// Thunk: Upload a dataset
export const asyncUploadDataset = (file) => async (dispatch) => {
  dispatch(setDatasetsUploading(true));
  const result = await uploadDataset(file);
  if (!result.error) {
    dispatch(addDataset(result.dataset));
  }
  dispatch(setDatasetsUploading(false));
  return result;
};

// Thunk: Delete a dataset
export const asyncDeleteDataset = (datasetId) => async (dispatch) => {
  dispatch(setDatasetsLoading(true));
  const result = await deleteDataset(datasetId);
  if (!result.error) {
    dispatch(deleteDatasetById(datasetId));
  }
  dispatch(setDatasetsLoading(false));
  return result;
};
