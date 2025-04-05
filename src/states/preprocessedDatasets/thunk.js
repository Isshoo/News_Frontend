import {
  setPreprocessedDatasets,
  addPreprocessedDataset,
  deletePreprocessedDatasetById,
} from './action';

import {
  fetchPreprocessedDatasets as apiFetchPreprocessedDatasets,
  createPreprocessedCopy as apiCreatePreprocessedCopy,
  deletePreprocessedDataset as apiDeletePreprocessedDataset,
  preprocessDataset as apiPreprocessDataset,
} from '../../utils/api/preprocess';

export const asyncFetchPreprocessedDatasets = (rawDatasetId) => async (dispatch) => {
  const response = await apiFetchPreprocessedDatasets(rawDatasetId);
  if (!response.error) {
    dispatch(setPreprocessedDatasets(response));
  }
};

export const asyncPreprocessRawDataset = (rawDatasetId) => async (dispatch) => {
  const response = await apiPreprocessDataset(rawDatasetId);
  if (!response.error) {
    dispatch(addPreprocessedDataset(response.data));
  }
  return response;
};

export const asyncCreatePreprocessedCopy = (rawDatasetId, name) => async (dispatch) => {
  const response = await apiCreatePreprocessedCopy(rawDatasetId, name);
  if (!response.error && response.data) {
    dispatch(addPreprocessedDataset(response.data));
    return response.data;
  }
  return null;
};

export const asyncDeletePreprocessedDataset = (datasetId) => async (dispatch) => {
  const response = await apiDeletePreprocessedDataset(datasetId);
  if (!response.error) {
    dispatch(deletePreprocessedDatasetById(datasetId));
  }
  return response;
};
