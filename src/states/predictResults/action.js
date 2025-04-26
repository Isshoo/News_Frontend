// redux/vectorized/action.js
export const SET_PREDICT_RESULTS = 'SET_PREDICT_RESULTS';
export const RESET_PREDICT_RESULTS = 'RESET_PREDICT_RESULTS';

export const setPredictResults = ({ data, pagination, totalC5, totalKnn, predictBy }) => ({
  type: SET_PREDICT_RESULTS,
  payload: { data, pagination, totalC5, totalKnn, predictBy },
});

export const resetPredictResults = () => ({
  type: RESET_PREDICT_RESULTS,
});
