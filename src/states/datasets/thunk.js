// /src/states/datasets/thunk.js

import {
  setDatasets,
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
};

// Thunk: Upload a dataset
export const asyncUploadDataset = (file) => async (dispatch) => {
  dispatch(setDatasetsUploading(true));
  const result = await uploadDataset(file);
  if (!result.error) {
    // refresh list
    const newList = await fetchDatasets();
    if (!newList.error) dispatch(setDatasets(newList));
    // set selected dataset
    const newId = result.dataset.id;
    dispatch(setSelectedDataset(newId));
  }
  dispatch(setDatasetsUploading(false));
  return result;
};

// Thunk: Delete a dataset
export const asyncDeleteDataset = (datasetId) => async (dispatch) => {
  dispatch(setDatasetsLoading(true));
  const result = await deleteDataset(datasetId);
  if (!result.error) {
    // refresh list
    const newList = await fetchDatasets();
    if (!newList.error) dispatch(setDatasets(newList));
  }
  dispatch(setDatasetsLoading(false));
  return result;
};
