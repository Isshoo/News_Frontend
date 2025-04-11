export const SET_MODELS = 'SET_MODELS';
export const SET_SELECTED_MODEL = 'SET_SELECTED_MODEL';
export const DELETE_MODEL = 'DELETE_MODEL';
export const UPDATE_MODEL_NAME = 'UPDATE_MODEL_NAME';
export const SET_LOADING = 'SET_LOADING';

export const setModels = (models) => ({
  type: SET_MODELS,
  payload: models,
});

export const setSelectedModel = ({ id, path }) => ({
  type: SET_SELECTED_MODEL,
  payload: { id, path },
});

export const deleteModel = (modelId) => ({
  type: DELETE_MODEL,
  payload: modelId,
});

export const updateModelName = (modelId, newName) => ({
  type: UPDATE_MODEL_NAME,
  payload: { modelId, newName },
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

