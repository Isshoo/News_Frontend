export const SET_MODELS = 'SET_MODELS';
export const DELETE_MODEL = 'DELETE_MODEL';
export const UPDATE_MODEL_NAME = 'UPDATE_MODEL_NAME';

export const setModels = (models) => ({
  type: SET_MODELS,
  payload: models,
});

export const deleteModel = (modelId) => ({
  type: DELETE_MODEL,
  payload: modelId,
});

export const updateModelName = (modelId, newName) => ({
  type: UPDATE_MODEL_NAME,
  payload: { modelId, newName },
});
