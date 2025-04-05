// src/states/datasets/reducer.js
import { ActionType } from './action';

const initialState = {
  datasets: [],
  isLoading: false,
};

export default function datasetsReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.SET_DATASETS:
    return {
      ...state,
      datasets: action.payload,
    };
  case ActionType.SET_LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };
  default:
    return state;
  }
}
