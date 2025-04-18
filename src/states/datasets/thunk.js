// /src/states/datasets/thunk.js

import {
  setDatasets,
  addDataset,
  deleteDatasetById,
  setDatasetsLoading,
  setSelectedDataset,
  setDatasetsUploading,
} from './action';

import {
  fetchDatasets,
  uploadDataset,
  deleteDataset,
} from '../../utils/api/dataset';

import Swal from 'sweetalert2';

// Thunk: Fetch all datasets
export const asyncFetchDatasets = () => async (dispatch) => {
  dispatch(setDatasetsLoading(true));
  const result = await fetchDatasets();
  if (!result.error) {
    dispatch(setDatasets(result));
  }
  dispatch(setDatasetsLoading(false));
  return result;
};

// Thunk: Upload a dataset

export const asyncUploadDataset = (file) => async (dispatch) => {
  dispatch(setDatasetsUploading(true));
  const result = await uploadDataset(file);

  if (result.dataset) {
    dispatch(addDataset(result.dataset));
    Swal.fire({
      icon: 'success',
      title: 'Upload Berhasil',
      text: result.message || 'Dataset berhasil diunggah.',
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Upload Gagal',
      text: result.error || 'Terjadi kesalahan saat mengunggah dataset.',
    });
  }

  dispatch(setDatasetsUploading(false));
  return result;
};

// Thunk: Delete a dataset
export const asyncDeleteDataset = (datasetId) => async (dispatch) => {
  const confirm = await Swal.fire({
    title: 'Delete Dataset?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  });

  if (!confirm.isConfirmed) return { canceled: true };

  dispatch(setDatasetsLoading(true));
  const result = await deleteDataset(datasetId);

  if (!result.error) {
    dispatch(deleteDatasetById(datasetId));
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: result.message || 'Dataset has been successfully deleted.',
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: result.error || 'Failed to delete the dataset.',
    });
  }

  dispatch(setDatasetsLoading(false));
  return result;
};
