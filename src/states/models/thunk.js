import { setModels, setSelectedModel, setLoading, deleteModel, updateModelName } from './action';
import { getModels, deleteModel as deleteModelAPI, editModelName } from '../../utils/api/model';
import { trainModel } from '../../utils/api/process';

export const asyncFetchModels = () => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await getModels();
  if (!response.error) {
    dispatch(setModels(response));
  }
  dispatch(setLoading(false));
  return response;
};

export const asyncTrainModel = (rawDatasetId, preprocessedDatasetId, name, split_size, n_neighbors) => async (dispatch) => {
  const response = await trainModel(rawDatasetId, preprocessedDatasetId, name, split_size, n_neighbors);
  if (!response.error) {
    dispatch(asyncFetchModels());
    dispatch(setSelectedModel(response.id,  response.model_path));
  }
  return response;
};

export const asyncDeleteModel = (modelId) => async (dispatch) => {
  const response = await deleteModelAPI(modelId);
  if (!response.error) {
    dispatch(deleteModel(modelId));
  }
  return response;
};

export const asyncUpdateModelName = (modelId, newName) => async (dispatch) => {
  const response = await editModelName(modelId, newName);
  if (!response.error) {
    dispatch(asyncFetchModels());
  }
  return response;
};
