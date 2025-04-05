// redux/parameter/reducer.js
import { SET_PARAMETER } from './action';

const initialState = {
  name: '',
  nNeighbors: 0,
  splitSize: 0,
  totalData: 0,
  topicCounts: {},
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
      ...action.payload,
    };
  default:
    return state;
  }
};

export default parameterReducer;
