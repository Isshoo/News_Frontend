// redux/vectorized/thunk.js
import { setVectorized } from './action';

export const updateVectorized = (data) => async (dispatch) => {
  dispatch(setVectorized(data));
};
