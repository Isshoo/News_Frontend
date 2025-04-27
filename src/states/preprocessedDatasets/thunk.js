import {
  setAllPreprocessedDatasets,
  setPreprocessedDatasets,
  addPreprocessedDataset,
  deletePreprocessedDatasetById,
  setPreprocessLoading,
  setPreprocessedDatasetLoading
} from './action';

import {
  fetchAllPreprocessedDatasets as apiFetchAllPreprocessedDatasets,
  fetchPreprocessedDatasets as apiFetchPreprocessedDatasets,
  createPreprocessedCopy as apiCreatePreprocessedCopy,
  deletePreprocessedDataset as apiDeletePreprocessedDataset,
  preprocessDataset as apiPreprocessDataset,
} from '../../utils/api/preprocess';

import { asyncFetchPreprocessedDatasetDetail } from '../preprocessedDatasetDetail/thunk';
import { setSelectedModel } from '../models/action';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { setSelectedDataset } from '../datasets/action';

export const asyncFetchAllPreprocessedDatasets = () => async (dispatch) => {

  const response = await apiFetchAllPreprocessedDatasets();
  if (!response.error) {
    await dispatch(setAllPreprocessedDatasets(response));
  }
  dispatch(setPreprocessedDatasetLoading(false));
  return response;
};

export const asyncFetchPreprocessedDatasets = (rawDatasetId) => async (dispatch) => {

  const response = await apiFetchPreprocessedDatasets(rawDatasetId);
  if (!response.error) {
    await dispatch(setPreprocessedDatasets(response));
  }
  dispatch(setPreprocessedDatasetLoading(false));
  return response;
};

export const asyncPreprocessRawDataset = (rawDatasetId) => async (dispatch) => {
  const confirm = await Swal.fire({
    title: 'Continue Preprocessing Dataset?',
    text: 'It will takes a few minutes to preprocess',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Preprocess!',
    cancelButtonText: 'Cancel',
  });

  if (!confirm.isConfirmed) return { canceled: true };

  dispatch(setPreprocessLoading(true));

  const response = await apiPreprocessDataset(rawDatasetId);

  const currentPath = window.location.pathname;

  if (!response.error) {
    await dispatch(addPreprocessedDataset(response.data));
    dispatch(setSelectedDataset(rawDatasetId));
    dispatch(setSelectedModel('', ''));
    dispatch(asyncFetchPreprocessedDatasetDetail(response.data.id));
    if (currentPath.includes('/admin/home/preprocessing')) {
      // Kalau user masih di halaman /admin/models
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.message || 'Dataset Preprocessed Successfully!',
      });
    } else {
      // Kalau user udah pindah ke halaman lain
      toast.success(response.message || 'Dataset Preprocessed Successfully!');
    }

  }
  else {
    if (currentPath.includes('/admin/home/preprocessing')) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: response.error || 'Failed to Preprocess Raw Dataset.',
      });
    } else {
      toast.error(response.error || 'Failed to Preprocess Raw Dataset.');
    }
  }
  dispatch(setPreprocessLoading(false));
  return response;
};

export const asyncCreatePreprocessedCopy = (rawDatasetId, name) => async (dispatch) => {
  if (!name) {
    Swal.fire({
      icon: 'info',
      text: 'Please input dataset name before make a copy!',
      timer: 2500,
      showConfirmButton: false,
    });
    return;
  }

  const response = await apiCreatePreprocessedCopy(rawDatasetId, name);
  if (!response.error) {
    await dispatch(addPreprocessedDataset(response.data));
    dispatch(setSelectedModel('', ''));
    dispatch(asyncFetchPreprocessedDatasetDetail(response.data.id));
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: response.message || 'A new copy of Preprocessed Dataset has been created.',
    });
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: response.error || 'Failed to create a copy of Preprocessed Dataset.',
    });
  }
  return response;
};

export const asyncDeletePreprocessedDataset = (datasetId) => async (dispatch) => {
  const confirm = await Swal.fire({
    title: 'Delete Preprocessed Dataset?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  });

  if (!confirm.isConfirmed) return { canceled: true };

  const response = await apiDeletePreprocessedDataset(datasetId);

  if (!response.error) {
    dispatch(deletePreprocessedDatasetById(datasetId));
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: response.message || 'Preprocessed Dataset has been deleted.',
    });
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: response.error || 'Failed to delete Preprocessed Dataset.',
    });
  }
  return response;
};
