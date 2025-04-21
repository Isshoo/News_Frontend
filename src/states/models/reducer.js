import {
  SET_MODELS,
  SET_SELECTED_MODEL,
  ADD_MODEL,
  DELETE_MODEL,
  UPDATE_MODEL_NAME,
  SET_LOADING,
  SET_TRAIN_LOADING
} from './action';

const initialState = {
  models: [],
  selectedModelId: '',
  selectedModelPath: '',
  modelsLoading: false,
  trainLoading: false
};

const modelsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_MODELS:
    return {
      ...state,
      models: action.payload,
    };

  case SET_SELECTED_MODEL:
    return {
      ...state,
      selectedModelId: action.payload.id,
      selectedModelPath: action.payload.path,
    };

  case ADD_MODEL:
    return {
      ...state,
      models: [...state.models, action.payload],
      selectedModelId: action.payload.id,
      selectedModelPath: action.payload.path,
    };

  case DELETE_MODEL: {
    const updatedModels = state.models.filter((model) => model.id !== action.payload);


    return {
      ...state,
      models: updatedModels,
      selectedModelId: '',
      selectedModelPath: '',
    };
  }

  case UPDATE_MODEL_NAME:
    return {
      ...state,
      models: state.models.map((model) =>
        model.id === action.payload.modelId
          ? { ...model, name: action.payload.newName }
          : model
      ),
    };

  case SET_LOADING:
    return {
      ...state,
      modelsLoading: action.payload,
    };

  case SET_TRAIN_LOADING:
    return {
      ...state,
      trainLoading: action.payload,
    };

  default:
    return state;
  }
};

export default modelsReducer;
