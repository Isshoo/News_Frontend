// /src/states/datasetDetail/action.js

export const SET_DATASET_DETAIL = 'SET_DATASET_DETAIL';
export const SET_DATASET_HISTORY_DETAIL = 'SET_DATASET_HISTORY_DETAIL';
export const RESET_DATASET_DETAIL = 'RESET_DATASET_DETAIL';
export const SET_DATASET_DETAIL_LOADING = 'SET_DATASET_DETAIL_LOADING';
export const SET_DATASET_PAGE = 'SET_DATASET_PAGE';
export const SET_DATASET_LIMIT = 'SET_DATASET_LIMIT';
export const ADD_DATA = 'ADD_DATA';
export const DELETE_DATA = 'DELETE_DATA';

export const setDatasetDetail = ({ data, totalData, topicCounts, totalPages }) => ({
  type: SET_DATASET_DETAIL,
  payload: { data, totalData, topicCounts, totalPages },
});

export const setDatasetHistoryDetail = (history) => ({
  type: SET_DATASET_HISTORY_DETAIL,
  payload: history,
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

export const addData = (data) => ({
  type: ADD_DATA,
  payload: data,
});

export const deleteData = (data) => ({
  type: DELETE_DATA,
  payload: data,
});
