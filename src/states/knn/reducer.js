// redux/knn/reducer.js
import { SET_KNN } from './action';

const initialState = {
  modelId: null,
  neighbors: [],
  distances: [],
  data: [], // JSON hasil konversi dari CSV
};

const knnReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_KNN:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default knnReducer;
