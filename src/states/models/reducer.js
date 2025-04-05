import { SET_MODELS, DELETE_MODEL, UPDATE_MODEL_NAME } from './action';

const initialState = [];

const modelsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_MODELS:
    return action.payload;
  case DELETE_MODEL:
    return state.filter((model) => model.id !== action.payload);
  case UPDATE_MODEL_NAME:
    return state.map((model) =>
      model.id === action.payload.modelId
        ? { ...model, name: action.payload.newName }
        : model
    );
  default:
    return state;
  }
};

export default modelsReducer;
