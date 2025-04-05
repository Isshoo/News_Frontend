// /src/states/datasetDetail/action.js

export const SET_DATASET_DETAIL = 'SET_DATASET_DETAIL';
export const RESET_DATASET_DETAIL = 'RESET_DATASET_DETAIL';
export const SET_DATASET_DETAIL_LOADING = 'SET_DATASET_DETAIL_LOADING';
export const SET_DATASET_PAGE = 'SET_DATASET_PAGE';
export const SET_DATASET_LIMIT = 'SET_DATASET_LIMIT';

export const setDatasetDetail = ({ data, totalData, topicCounts, totalPages }) => ({
  type: SET_DATASET_DETAIL,
  payload: { data, totalData, topicCounts, totalPages },
});

export const resetDatasetDetail = () => ({
  type: RESET_DATASET_DETAIL,
});

export const setDatasetDetailLoading = (isLoading) => ({
  type: SET_DATASET_DETAIL_LOADING,
  payload: isLoading,
});

export const setDatasetPage = (page) => ({
  type: SET_DATASET_PAGE,
  payload: page,
});

export const setDatasetLimit = (limit) => ({
  type: SET_DATASET_LIMIT,
  payload: limit,
});
