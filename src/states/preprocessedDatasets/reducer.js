import {
  SET_PREPROCESSED_DATASETS,
  ADD_PREPROCESSED_DATASET,
  DELETE_PREPROCESSED_DATASET,
} from './action';

const initialState = [];

const preprocessedDatasetsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_PREPROCESSED_DATASETS:
    return action.payload;
  case ADD_PREPROCESSED_DATASET:
    return [...state, action.payload];
  case DELETE_PREPROCESSED_DATASET:
    return state.filter((dataset) => dataset.id !== action.payload);
  default:
    return state;
  }
};

export default preprocessedDatasetsReducer;
