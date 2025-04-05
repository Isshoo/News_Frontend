export const SET_PREPROCESSED_DATASET_DETAIL = 'SET_PREPROCESSED_DATASET_DETAIL';
export const UPDATE_PREPROCESSED_DATA_ROW = 'UPDATE_PREPROCESSED_DATA_ROW';
export const DELETE_PREPROCESSED_DATA_ROW = 'DELETE_PREPROCESSED_DATA_ROW';
export const ADD_PREPROCESSED_DATA_ROW = 'ADD_PREPROCESSED_DATA_ROW';

export const setPreprocessedDatasetDetail = (detail) => ({
  type: SET_PREPROCESSED_DATASET_DETAIL,
  payload: detail,
});

export const updatePreprocessedDataRow = (updatedRow) => ({
  type: UPDATE_PREPROCESSED_DATA_ROW,
  payload: updatedRow,
});

export const deletePreprocessedDataRow = (rowId) => ({
  type: DELETE_PREPROCESSED_DATA_ROW,
  payload: rowId,
});

export const addPreprocessedDataRow = (newRow) => ({
  type: ADD_PREPROCESSED_DATA_ROW,
  payload: newRow,
});
