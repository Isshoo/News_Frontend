import {
  setPreprocessedDatasetDetail,
  updatePreprocessedDataRow,
  deletePreprocessedDataRow,
  addPreprocessedDataRow,
} from './action';

import {
  fetchPreprocessedDatasetDetail,
  updatePreprocessedData,
  deletePreprocessedData,
  addPreprocessedData,
} from '../../utils/api/preprocess';

export const asyncFetchPreprocessedDatasetDetail = (datasetId) => async (dispatch) => {
  const response = await fetchPreprocessedDatasetDetail(datasetId);
  if (!response.error) {
    dispatch(setPreprocessedDatasetDetail(response.data));
  }
};

export const asyncUpdatePreprocessedData = (datasetId, rowId, newData) => async (dispatch) => {
  const response = await updatePreprocessedData(datasetId, rowId, newData);
  if (!response.error) {
    dispatch(updatePreprocessedDataRow(response.data));
  }
};

export const asyncDeletePreprocessedData = (datasetId, rowId) => async (dispatch) => {
  const response = await deletePreprocessedData(datasetId, rowId);
  if (!response.error) {
    dispatch(deletePreprocessedDataRow(rowId));
  }
};

export const asyncAddPreprocessedData = (datasetId, data) => async (dispatch) => {
  const response = await addPreprocessedData(datasetId, data);
  if (!response.error) {
    dispatch(addPreprocessedDataRow(response.data));
  }
};
