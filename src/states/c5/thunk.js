// redux/c5/thunk.js
import { setC5 } from './action';

export const updateC5 = (c5Data) => async (dispatch) => {
  dispatch(setC5(c5Data));
};
