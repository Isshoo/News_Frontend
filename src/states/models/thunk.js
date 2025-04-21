import { setModels, setSelectedModel, setLoading, deleteModel, updateModelName } from './action';
import { getModels, deleteModel as deleteModelAPI, editModelName } from '../../utils/api/model';
import { trainModel } from '../../utils/api/process';
import { mapSplitResult } from '../../utils/helper';

import Swal from 'sweetalert2';

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
  // bertanya apakah benar-benar ingin melatih model dengan parameter tersebut? menggunakan bahasa inggris
  const confirm = await Swal.fire({
    title: 'Train model using these parameters?',
    text: `Train-Test-Split = ${mapSplitResult(split_size)} ,  K_Neighbors = ${n_neighbors} ,  and Name = "${name}"`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Train Model!',
    cancelButtonText: 'Cancel',
  });

  if (!confirm.isConfirmed) return { canceled: true };

  const response = await trainModel(rawDatasetId, preprocessedDatasetId, name, split_size, n_neighbors);
  if (!response.error) {
    dispatch(asyncFetchModels());
    dispatch(setSelectedModel(response.id,  response.model_path));
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: response.message || 'Model Trained Successfully.',
    });
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: response.error || 'Failed to Train model.',
    });
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
