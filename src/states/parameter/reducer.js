// redux/parameter/reducer.js
import { SET_PARAMETER, RESET_PARAMETER, UPDATE_SPLIT_SIZE, UPDATE_N_NEIGHBORS } from './action';

const initialState = {
  nNeighbors: 0,
  splitSize: 0,
  trainSize: 0,
  testSize: 0,
  trainPerTopic: {},
  testPerTopic: {},
};

const parameterReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_PARAMETER:
    return {
      ...state,
      nNeighbors: action.payload.n_neighbors,
      splitSize: action.payload.split_size,
      trainSize: action.payload.train_size,
      testSize: action.payload.test_size,
      trainPerTopic: action.payload.train_per_topic,
      testPerTopic: action.payload.test_per_topic,
    };
  case RESET_PARAMETER:
    return {
      ...initialState,
    };
  case UPDATE_SPLIT_SIZE:
    return {
      ...state,
      splitSize: action.payload.split_size,
      trainSize: action.payload.train_size,
      testSize: action.payload.test_size,
      trainPerTopic: action.payload.train_per_topic,
      testPerTopic: action.payload.test_per_topic,
    };
  case UPDATE_N_NEIGHBORS:
    return {
      ...state,
      nNeighbors: action.payload,
    };
  default:
    return state;
  }
};

export default parameterReducer;
