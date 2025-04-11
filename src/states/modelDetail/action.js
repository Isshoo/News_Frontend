export const SET_MODEL_DETAIL = 'SET_MODEL_DETAIL';
export const RESET_MODEL_DETAIL = 'RESET_MODEL_DETAIL';
export const UPDATE_MODEL_NAME = 'UPDATE_MODEL_NAME';


export const setModelDetail = ({ name, raw_dataset_id, preprocessed_dataset_id, model_path, total_data, created_at, updated_at }) => ({
  type: SET_MODEL_DETAIL,
  payload: { name, raw_dataset_id, preprocessed_dataset_id, model_path, total_data, created_at, updated_at },
});

export const resetModelDetail = () => ({
  type: RESET_MODEL_DETAIL,
});

export const updateModelName = (newName) => ({
  type: UPDATE_MODEL_NAME,
  payload:  newName,
});
