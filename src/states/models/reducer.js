import { SET_MODELS, SET_SELECTED_MODEL, DELETE_MODEL, UPDATE_MODEL_NAME, SET_LOADING } from './action';

const initialState = {
  models: [],
  selectedModelId: localStorage.getItem('model_id') || 'default-stemmed',
  selectedModelPath: 'src/storage/models/base/hybrid_model.joblib',
  loading: false,
};

const modelsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_MODELS:
    return {
      ...state,
      models: action.payload,
    };
  case SET_SELECTED_MODEL:
    localStorage.setItem('model_id', action.payload.id);
    return {
      ...state,
      selectedModelId: action.payload.id,
      selectedModelPath: action.payload.path,
    };
  case DELETE_MODEL:
    localStorage.removeItem('model_id');
    return {
      ...state,
      models: state.models.filter((model) => model.id !== action.payload),
      selectedModelId: state.selectedModelId == action.payload ? state.models[0]?.id || 'default-stemmed' : state.selectedModelId,
      selectedModelPath: state.selectedModelId == action.payload ? state.models[0]?.path || 'src/storage/models/base/hybrid_model.joblib' : state.selectedModelPath,
    };
  case UPDATE_MODEL_NAME:
    return {
      ...state,
      models: state.models.map((model) =>
        model.id === action.payload.modelId ? { ...model, name: action.payload.newName } : model,
      ),
    };
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
