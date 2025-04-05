import { setModels, setLoading, deleteModel, updateModelName } from './action';
import { getModels, deleteModel as deleteModelAPI, editModelName } from '../../utils/api/model';

export const asyncFetchModels = () => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await getModels();
  if (!response.error) {
    dispatch(setModels(response));
  }
  dispatch(setLoading(false));
};

export const asyncDeleteModel = (modelId) => async (dispatch) => {
  const response = await deleteModelAPI(modelId);
  if (!response.error) {
    dispatch(deleteModel(modelId));
  }
};

export const asyncUpdateModelName = (modelId, newName) => async (dispatch) => {
  const response = await editModelName(modelId, newName);
  if (!response.error) {
    dispatch(updateModelName(modelId, newName));
  }
};
