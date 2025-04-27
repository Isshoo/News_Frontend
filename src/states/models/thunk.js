import { setModels, setSelectedModel, addModel, setLoading, deleteModel, setTrainLoading } from './action';
import { getModels, deleteModel as deleteModelAPI, editModelName } from '../../utils/api/model';
import { trainModel } from '../../utils/api/process';
import { mapSplitResult } from '../../utils/helper';

import { setSelectedDataset } from '../datasets/action';
import { setSelectedPreprocessedDataset } from '../preprocessedDatasets/action';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export const asyncFetchModels = () => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await getModels();
  if (!response.error) {
    await dispatch(setModels(response));
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

  dispatch(setTrainLoading(true));

  const response = await trainModel(rawDatasetId, preprocessedDatasetId, name, split_size, n_neighbors);

  const currentPath = window.location.pathname;

  if (!response.error) {
    await dispatch(addModel(response));
    dispatch(setSelectedModel(response.id,  response.model_path));

    if (currentPath.includes('/admin/home/parameters')) {
      // Kalau user masih di halaman /admin/models
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.message || 'Model Trained Successfully.',
      });
    } else {
      // Kalau user udah pindah ke halaman lain
      toast.success(response.message || 'Model Trained Successfully!');
    }
  }
  else {
    if (currentPath.includes('/admin/home/parameters')) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: response.error || 'Failed to Train model.',
      });
    } else {
      toast.error(response.error || 'Failed to Train model.');
    }
  }
  dispatch(setTrainLoading(false));
  return response;
};

export const asyncDeleteModel = (modelId) => async (dispatch) => {
  const confirm = await Swal.fire({
    title: 'Delete Model?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  });

  if (!confirm.isConfirmed) return { canceled: true };

  const response = await deleteModelAPI(modelId);
  if (!response.error) {
    await dispatch(deleteModel(modelId));
    dispatch(setSelectedDataset(''));
    dispatch(setSelectedPreprocessedDataset(''));
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: response.message || 'Model has been successfully deleted.',
    });
  }  else {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: response.error || 'Failed to delete model.',
    });
  }
  return response;
};

export const asyncUpdateModelName = (modelId, newName) => async (dispatch) => {
  // const confirm = await Swal.fire({
  //   title: 'Continue Renaming Model?',
  //   text: `Model's name will change to "${newName}"`,
  //   icon: 'question',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes, Rename Model!',
  //   cancelButtonText: 'Cancel',
  // });

  // if (!confirm.isConfirmed) return { canceled: true };

  const response = await editModelName(modelId, newName);
  if (!response.error) {
    await dispatch(asyncFetchModels());
    Swal.fire({
      icon: 'success',
      title: 'Renamed!',
      text: response.message || 'Model has been successfully renamed.',
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: response.error || 'Failed to rename model.',
    });
  }
  return response;
};
