// redux/vectorized/reducer.js
import { SET_VECTORIZED } from './action';

const initialState = {
  modelId: null,
  vectorStatus: false, // bisa ganti dengan "loading", "success", "failed" jika ingin lebih detail
  vectorData: null,     // bisa diisi hasil tf-idf jika perlu
};

const vectorizedReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_VECTORIZED:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default vectorizedReducer;
