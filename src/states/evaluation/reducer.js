// redux/evaluation/reducer.js
import { SET_EVALUATION } from './action';

const initialState = {
  modelId: null,
  confusionMatrix: [],
  classificationReport: {},
};

const evaluationReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_EVALUATION:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default evaluationReducer;
