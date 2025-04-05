import {
  setPreprocessedDatasetDetail,
  updatePreprocessedDataRowLabel,
  deletePreprocessedDataRow,
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

export const asyncUpdatePreprocessedDataLabel = (datasetId, index, newLabel) => async (dispatch, getState) => {
  try {
    await updateLabel(datasetId, index, newLabel); // API call
    const { limit, currentPage } = getState().preprocessedDatasetDetail;
    dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, currentPage, limit)); // Refresh data
  } catch (err) {
    console.error(err);
  }
};

export const asyncDeletePreprocessedData = (datasetId, index) => async (dispatch, getState) => {
  try {
    await deleteData(datasetId, index); // API call
    const { limit, currentPage } = getState().preprocessedDatasetDetail;
    dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, currentPage, limit)); // Refresh data
  } catch (err) {
    console.error(err);
  }
};

export const asyncAddPreprocessedData = (datasetId, contentSnippet, topik) => async (dispatch, getState) => {
  try {
    await addData(datasetId, contentSnippet, topik); // API call
    const { limit, totalPages } = getState().preprocessedDatasetDetail;
    const currentPage = totalPages > 0 ? totalPages : 1;
    dispatch(asyncFetchPreprocessedDatasetDetail(datasetId, currentPage, limit)); // Refresh data
  } catch (err) {
    console.error(err);
  }
};
