// redux/parameter/thunk.js
import { setParameter } from './action';

export const updateParameter = (params) => async (dispatch) => {
  dispatch(setParameter(params));
};
