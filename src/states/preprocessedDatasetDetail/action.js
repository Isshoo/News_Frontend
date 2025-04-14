export const SET_PREPROCESSED_DATASET_DETAIL = 'SET_PREPROCESSED_DATASET_DETAIL';
export const RESET_PREPROCESSED_DATASET_DETAIL = 'RESET_PREPROCESSED_DATASET_DETAIL';
export const UPDATE_PREPROCESSED_DATA_ROW_LABEL = 'UPDATE_PREPROCESSED_DATA_ROW_LABEL';
export const DELETE_PREPROCESSED_DATA_ROW = 'DELETE_PREPROCESSED_DATA_ROW';
export const ADD_PREPROCESSED_DATA_ROW = 'ADD_PREPROCESSED_DATA_ROW';
export const SET_PREPROCESSED_DATASET_DETAIL_LOADING = 'SET_PREPROCESSED_DATASET_DETAIL_LOADING';
export const SET_PREPROCESSED_DATASET_PAGE = 'SET_PREPROCESSED_DATASET_PAGE';
export const SET_PREPROCESSED_DATASET_LIMIT = 'SET_PREPROCESSED_DATASET_LIMIT';

export const setPreprocessedDatasetDetail = ({ data, totalData, topicCounts, totalPages }) => ({
  type: SET_PREPROCESSED_DATASET_DETAIL,
  payload: { data, totalData, topicCounts, totalPages },
});

export const resetPreprocessedDatasetDetail = () => ({
  type: RESET_PREPROCESSED_DATASET_DETAIL,
});

export const updatePreprocessedDataRowLabel = (index, newLabel) => ({
  type: UPDATE_PREPROCESSED_DATA_ROW_LABEL,
  payload: {
    index,
    newLabel,
  },
});

export const deletePreprocessedDataRow = (index) => ({
  type: DELETE_PREPROCESSED_DATA_ROW,
  payload: index,
});

export const addPreprocessedDataRow = (contentSnippet, topik) => ({
  type: ADD_PREPROCESSED_DATA_ROW,
  payload: {
    contentSnippet,
    topik,
  },
});

export const setPreprocessedDatasetDetailLoading = (loading) => ({
  type: SET_PREPROCESSED_DATASET_DETAIL_LOADING,
  payload: loading,
});

export const setPreprocessedDatasetPage = (page) => ({
  type: SET_PREPROCESSED_DATASET_PAGE,
  payload: page,
});

export const setPreprocessedDatasetLimit = (limit) => ({
  type: SET_PREPROCESSED_DATASET_LIMIT,
  payload: limit,
});
