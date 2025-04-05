import {
  setPreprocessedDatasetDetail,
  updatePreprocessedDataRowLabel,
  deletePreprocessedDataRow,
  addPreprocessedDataRow,
  setPreprocessedDatasetDetailLoading,
  setPreprocessedDatasetPage,
  setPreprocessedDatasetLimit,
} from './action';

import {
  fetchPreprocessedDataset,
  updateLabel,
  deleteData,
  addData,
} from '../../utils/api/preprocess';

export const asyncFetchPreprocessedDatasetDetail = (datasetId, page = 1, limit = 10) => async (dispatch) => {
  dispatch(setPreprocessedDatasetDetailLoading(true));
  const response = await fetchPreprocessedDataset(datasetId, page, limit);
  if (!response.error) {
    dispatch(setPreprocessedDatasetDetail(response));
    dispatch(setPreprocessedDatasetPage(page));
    dispatch(setPreprocessedDatasetLimit(limit));
  }
  dispatch(setPreprocessedDatasetDetailLoading(false));
};

export const asyncUpdatePreprocessedDataLabel = (datasetId, index, newLabel) => async (dispatch) => {
  const response = await updateLabel(datasetId, index, newLabel);
  if (!response.error) {
    dispatch(updatePreprocessedDataRowLabel(index, newLabel));
  }
};

export const asyncDeletePreprocessedData = (datasetId, index) => async (dispatch) => {
  const response = await deleteData(datasetId, index);
  if (!response.error) {
    dispatch(deletePreprocessedDataRow(index));
  }
};

export const asyncAddPreprocessedData = (datasetId, contentSnippet, topik) => async (dispatch) => {
  const response = await addData(datasetId, contentSnippet, topik);
  if (!response.error) {
    dispatch(addPreprocessedDataRow(contentSnippet, topik));
  }
};
