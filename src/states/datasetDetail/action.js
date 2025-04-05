// /src/states/datasetDetail/action.js

export const SET_DATASET_DETAIL = 'SET_DATASET_DETAIL';
export const SET_DATASET_DETAIL_LOADING = 'SET_DATASET_DETAIL_LOADING';
export const SET_DATASET_PAGE = 'SET_DATASET_PAGE';

export const setDatasetDetail = ({ data, totalData, topicCounts, totalPages }) => ({
  type: SET_DATASET_DETAIL,
  payload: { data, totalData, topicCounts, totalPages },
});

export const setDatasetDetailLoading = (isLoading) => ({
  type: SET_DATASET_DETAIL_LOADING,
  payload: isLoading,
});

export const setDatasetPage = (page) => ({
  type: SET_DATASET_PAGE,
  payload: page,
});
