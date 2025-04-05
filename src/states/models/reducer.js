import { SET_MODELS, DELETE_MODEL, UPDATE_MODEL_NAME, SET_LOADING } from './action';

const initialState = {
  models: [],
  loading: false,
};

const modelsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_MODELS:
    return {
      ...state,
      models: action.payload,
    };
  case DELETE_MODEL:
    return state.filter((model) => model.id !== action.payload);
  case UPDATE_MODEL_NAME:
    return state.map((model) =>
      model.id === action.payload.modelId
        ? { ...model, name: action.payload.newName }
        : model
    );
  case SET_LOADING:
    return {
      ...state,
      loading: action.payload,
    };
  default:
    return state;
  }
};

export default modelsReducer;
