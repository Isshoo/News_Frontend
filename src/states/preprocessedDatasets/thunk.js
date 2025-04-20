import {
  setPreprocessedDatasets,
  addPreprocessedDataset,
  deletePreprocessedDatasetById,
} from './action';

import {
  fetchPreprocessedDatasets as apiFetchPreprocessedDatasets,
  createPreprocessedCopy as apiCreatePreprocessedCopy,
  deletePreprocessedDataset as apiDeletePreprocessedDataset,
  preprocessDataset as apiPreprocessDataset,
} from '../../utils/api/preprocess';

import Swal from 'sweetalert2';

export const asyncFetchPreprocessedDatasets = (rawDatasetId) => async (dispatch) => {
  const response = await apiFetchPreprocessedDatasets(rawDatasetId);
  if (!response.error) {
    dispatch(setPreprocessedDatasets(response));
  }
};

export const asyncPreprocessRawDataset = (rawDatasetId) => async (dispatch) => {
  const response = await apiPreprocessDataset(rawDatasetId);
  if (!response.error) {
    dispatch(addPreprocessedDataset(response.data));
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: response.message || 'Successfully Preprocess Raw Dataset.',
    });
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: response.error || 'Failed to Preprocess Raw Dataset.',
    });
  }
  return response;
};

export const asyncCreatePreprocessedCopy = (rawDatasetId, name) => async (dispatch) => {
  const response = await apiCreatePreprocessedCopy(rawDatasetId, name);
  if (!response.error && response.data) {
    dispatch(addPreprocessedDataset(response.data));
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: response.message || 'A new copy of Preprocessed Dataset has been created.',
    });
    return response.data;
  }
  Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: response.error || 'Failed to create a copy of Preprocessed Dataset.',
  });
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
