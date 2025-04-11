// redux/vectorized/action.js
export const SET_VECTORIZED = 'SET_VECTORIZED';
export const RESET_VECTORIZED = 'RESET_VECTORIZED';

export const setVectorized = ({ data, pagination }) => ({
  type: SET_VECTORIZED,
  payload: { data, pagination },
});

export const resetVectorized = () => ({
  type: RESET_VECTORIZED,
});
