import { SET_MODELS, DELETE_MODEL, UPDATE_MODEL_NAME, SET_LOADING } from './action';

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
  case 'SET_SELECTED_MODEL':
    localStorage.setItem('model_id', action.payload.id);
    return {
      ...state,
      selectedModelId: action.payload.id,
      selectedModelPath: action.payload.path,
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
