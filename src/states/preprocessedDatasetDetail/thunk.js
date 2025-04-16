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
  updatePreprocessedData,
  deleteData,
  addData,
} from '../../utils/api/preprocess';

export const asyncFetchPreprocessedDatasetDetail = (datasetId, page = 1, limit = 10) => async (dispatch) => {
  dispatch(setPreprocessedDatasetDetailLoading(true));
  const result = await fetchPreprocessedDataset(datasetId, page, limit);
  if (!result.error) {
    dispatch(setPreprocessedDatasetDetail({
      data: result.data,
      totalData: result.total_data,
      topicCounts: result.topic_counts,
      totalPages: result.total_pages,
    }));
    dispatch(setPreprocessedDatasetPage(page));
    dispatch(setPreprocessedDatasetLimit(limit));
  }
  dispatch(setPreprocessedDatasetDetailLoading(false));
};

export const asyncUpdatePreprocessedData = (datasetId, index, newLabel, newPreprocessedContent) => async (dispatch, getState) => {
  try {
    await updatePreprocessedData(datasetId, index, newLabel, newPreprocessedContent); // API call
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
