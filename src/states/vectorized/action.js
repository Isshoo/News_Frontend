// redux/vectorized/action.js
export const SET_VECTORIZED = 'SET_VECTORIZED';

export const setVectorized = (data) => ({
  type: SET_VECTORIZED,
  payload: data,
});
