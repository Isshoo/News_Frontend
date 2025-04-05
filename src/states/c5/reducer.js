// redux/c5/reducer.js
import { SET_C5 } from './action';

const initialState = {
  modelId: null,
  tree: null,
  entropy: null,
  data: [], // bentuk json dari CSV
};

const c5Reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_C5:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default c5Reducer;
