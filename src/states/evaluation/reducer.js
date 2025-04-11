// redux/evaluation/reducer.js
import { SET_EVALUATION, RESET_EVALUATION } from './action';

const initialState = {
  accuracy: 0,
  confusionMatrix: [],
  classificationReport: {},
};

const evaluationReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_EVALUATION:
    return {
      ...state,
      accuracy: action.payload.accuracy,
      confusionMatrix: action.payload.confusionMatrix,
      classificationReport: action.payload.classificationReport,
    };
  case RESET_EVALUATION:
    return {
      ...initialState,
    };
  default:
    return state;
  }
};

export default evaluationReducer;
