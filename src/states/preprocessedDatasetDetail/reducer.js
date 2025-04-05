import {
  SET_PREPROCESSED_DATASET_DETAIL,
  UPDATE_PREPROCESSED_DATA_ROW,
  DELETE_PREPROCESSED_DATA_ROW,
  ADD_PREPROCESSED_DATA_ROW,
} from './action';

const initialState = null;

const preprocessedDatasetDetailReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_PREPROCESSED_DATASET_DETAIL:
    return action.payload;
  case UPDATE_PREPROCESSED_DATA_ROW:
    return {
      ...state,
      rows: state.rows.map((row) =>
        row.id === action.payload.id ? action.payload : row
      ),
    };
  case DELETE_PREPROCESSED_DATA_ROW:
    return {
      ...state,
      rows: state.rows.filter((row) => row.id !== action.payload),
    };
  case ADD_PREPROCESSED_DATA_ROW:
    return {
      ...state,
      rows: [...state.rows, action.payload],
    };
  default:
    return state;
  }
};

export default preprocessedDatasetDetailReducer;
