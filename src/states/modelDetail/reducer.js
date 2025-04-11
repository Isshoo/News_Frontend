import { SET_MODEL_DETAIL, RESET_MODEL_DETAIL, UPDATE_MODEL_NAME } from './action';

const initialState = {
  name: '',
  raw_dataset_id: '',
  preprocessed_dataset_id: '',
  model_path: '',
  total_data: 0,
  created_at: '',
  updated_at: '',
};

const modelDetailReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_MODEL_DETAIL:
    return {
      ...state,
      name: action.payload.name,
      raw_dataset_id: action.payload.raw_dataset_id,
      preprocessed_dataset_id: action.payload.preprocessed_dataset_id,
      model_path: action.payload.model_path,
      total_data: action.payload.total_data,
      created_at: action.payload.created_at,
      updated_at: action.payload.updated_at,
    };
  case RESET_MODEL_DETAIL: {
    return {
      ...initialState,
    };
  }
  case UPDATE_MODEL_NAME: {
    return {
      ...state,
      name: action.payload,
    };
  }
  default:
    return state;
  }
};

export default modelDetailReducer;
