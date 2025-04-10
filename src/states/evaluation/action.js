// redux/evaluation/action.js
export const SET_EVALUATION = 'SET_EVALUATION';
export const RESET_EVALUATION = 'RESET_EVALUATION';


// set evaluation
export const setEvaluation = ({ modelId, accuracy, confusionMatrix, classificationReport }) => ({
  type: SET_EVALUATION,
  payload: { modelId, accuracy, confusionMatrix, classificationReport },
});

// reset evaluation
export const resetEvaluation = () => ({
  type: RESET_EVALUATION,
});

