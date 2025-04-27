// thunk
import { toast } from 'react-toastify';

import {
  setLoading,
  setClassifyLoading,
  setCsvLoading,
  setClassificationResult,
  addPrediction,
  addPredictionEntry,
  updateLastPrediction,
  updateClassificationRow,
  setRetryLoading
} from './action';
import { predictCsv, predict } from '../../utils/api/classifier';

import Swal from 'sweetalert2';

export const classifyNews = (text) => async (dispatch, getState) => {

  // Masukkan dulu ke state agar UI langsung muncul
  dispatch(addPredictionEntry({
    text: text, // anggap preprocessed = input awal
    preprocessed: null, // anggap preprocessed = input awal
    hybrid: null,
    deepseek: null,
  }));

  dispatch(setLoading(true));
  dispatch(setClassifyLoading(true));

  const { selectedModelPath } = getState().models;
  const response = await predict({ text, model_path: selectedModelPath });

  if (response.error) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: response.error || 'Failed to classify news.',
    });
    dispatch(setLoading(false));
    dispatch(setClassifyLoading(false));
    return response;
  }
  if (response.model_error !== '') {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: response.model_error || 'Failed to classify news.',
    });
  }

  await dispatch(updateLastPrediction({
    preprocessed: response.Preprocessed_Text,
    hybrid: response.Hybrid_C5_KNN,
    deepseek: response.DeepSeek,
  }));

  dispatch(setLoading(false));
  dispatch(setClassifyLoading(false));

  return response;
};


export const classifyCsvThunk = () => async (dispatch, getState) => {
  const { selectedModelPath } = getState().models;
  const { csvData } = getState().classifier;

  dispatch(setCsvLoading(true));

  const csvContent = csvData.map((row) => `"${row.contentSnippet}"`).join('\n');
  const csvBlob = new Blob([`"contentSnippet"\n${csvContent}`], { type: 'text/csv' });
  const csvFile = new File([csvBlob], 'classification-result.csv', { type: 'text/csv' });

  const response = await predictCsv(csvFile, selectedModelPath);
  if (response.error) {
    toast.error(response.error || 'Failed to classify CSV.');
    dispatch(setCsvLoading(false));
    return response;
  }
  dispatch(setClassificationResult(response));
  toast.success('CSV classification finished successfully!', {
    position: 'top-right',
  });
  dispatch(setCsvLoading(false));

  return response;

};

export const classifyRowThunk = (index, contentSnippet) => async (dispatch, getState) => {
  dispatch(setRetryLoading(index, true));
  const { selectedModelPath } = getState().models;

  const response = await predict({ text: contentSnippet, model_path: selectedModelPath });
  if (response.error) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: response.error || 'Failed to classify news.',
    });
    dispatch(setRetryLoading(index, true));
    return response;
  }
  dispatch(updateClassificationRow(index, 'DeepSeek', response?.DeepSeek || 'Unknown'));
  dispatch(setRetryLoading(index, true));

  return response;
};
