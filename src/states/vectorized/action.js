// redux/vectorized/action.js
export const SET_VECTORIZED = 'SET_VECTORIZED';
export const RESET_VECTORIZED = 'RESET_VECTORIZED';

export const setTfidfStats = ({ data, pagination }) => ({
  type: SET_VECTORIZED,
  payload: { data, pagination },
});

export const resetTfidfStats = () => ({
  type: RESET_VECTORIZED,
});
