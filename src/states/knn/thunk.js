// redux/knn/thunk.js
import { setKNN } from './action';

export const updateKNN = (knnData) => async (dispatch) => {
  dispatch(setKNN(knnData));
};
