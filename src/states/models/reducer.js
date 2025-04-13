import {
  SET_MODELS,
  SET_SELECTED_MODEL,
  DELETE_MODEL,
  UPDATE_MODEL_NAME,
  SET_LOADING,
} from './action';

const initialState = {
  models: [],
  selectedModelId: '',
  selectedModelPath: '',
  modelsLoading: false,
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

  case DELETE_MODEL: {
    const updatedModels = state.models.filter((model) => model.id !== action.payload);
    const isDeleted = state.selectedModelId === action.payload;
    const fallbackModel = updatedModels[0] || {
      id: null,
      path: null,
    };

    return {
      ...state,
      models: updatedModels,
      selectedModelId: isDeleted ? fallbackModel.id : state.selectedModelId,
      selectedModelPath: isDeleted ? fallbackModel.path : state.selectedModelPath,
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

  default:
    return state;
  }
};

export default modelsReducer;
