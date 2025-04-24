// redux/vectorized/action.js
export const SET_PREDICT_RESULTS = 'SET_PREDICT_RESULTS';
export const RESET_PREDICT_RESULTS = 'RESET_PREDICT_RESULTS';

export const setPredictResults = ({ data, pagination }) => ({
  type: SET_PREDICT_RESULTS,
  payload: { data, pagination },
});

export const resetPredictResults = () => ({
  type: RESET_PREDICT_RESULTS,
});
