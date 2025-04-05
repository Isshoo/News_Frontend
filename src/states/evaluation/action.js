// redux/evaluation/action.js
export const SET_EVALUATION = 'SET_EVALUATION';

export const setEvaluation = (data) => ({
  type: SET_EVALUATION,
  payload: data,
});
