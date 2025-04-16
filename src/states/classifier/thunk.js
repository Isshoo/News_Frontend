// thunk

import {
  setLoading,
  setClassificationResult,
  addPrediction,
  addPredictionEntry,
  updateLastPrediction,
  updateClassificationRow,
} from './action';
import { predictCsv, predict } from '../../utils/api/classifier';

export const classifyNews = (text, retryCount = 4) => async (dispatch, getState) => {
  if (retryCount <= 0) {
    console.warn('DeepSeek prediction failed after multiple retries.');
    dispatch(setLoading(false));
    return;
  }

  // Masukkan dulu ke state agar UI langsung muncul
  dispatch(addPredictionEntry({
    text: text, // anggap preprocessed = input awal
    preprocessed: null, // anggap preprocessed = input awal
    hybrid: null,
    deepseek: null,
  }));

  dispatch(setLoading(true));

  const { selectedModelPath } = getState().models;
  const response = await predict({ text, model_path: selectedModelPath });

  if (response.error) {
    alert(response.error);
    dispatch(setLoading(false));
    return;
  }

  if (!response.DeepSeek) {
    console.log(`DeepSeek retrying... (${4 - retryCount})`);
    setTimeout(() => dispatch(classifyNews(text, retryCount - 1)), 1000);
    return;
  }

  dispatch(updateLastPrediction({
    preprocessed: response.Preprocessed_Text,
    hybrid: response.Hybrid_C5_KNN,
    deepseek: response.DeepSeek,
  }));

  dispatch(setLoading(false));
};


export const classifyCsvThunk = () => async (dispatch, getState) => {
  const { selectedModelPath } = getState().models;
  const { csvData } = getState().classifier;

  dispatch(setLoading(true));
  try {
    const csvContent = csvData.map((row) => `"${row.contentSnippet}"`).join('\n');
    const csvBlob = new Blob([`"contentSnippet"\n${csvContent}`], { type: 'text/csv' });
    const csvFile = new File([csvBlob], 'classification-result.csv', { type: 'text/csv' });

    const response = await predictCsv(csvFile, selectedModelPath);
    if (response.error) {
      dispatch(setLoading(false));
      throw new Error('Failed to classify CSV');
    }
    dispatch(setClassificationResult(response));
    dispatch(setLoading(false));

    return response;
  } catch (err) {
    alert('Gagal mengklasifikasikan CSV');
    console.error(err);
  }
  dispatch(setLoading(false));
};

export const classifyRowThunk = (index, contentSnippet) => async (dispatch, getState) => {
  const { selectedModelPath } = getState().models;
  try {
    const response = await predict({ text: contentSnippet, model_path: selectedModelPath });
    if (response.error) {
      throw new Error('Failed to classify row');
    }
    dispatch(updateClassificationRow(index, 'DeepSeek', response?.DeepSeek || 'Unknown'));
  } catch (err) {
    alert('Gagal mengklasifikasikan baris.');
    console.error(err);
  }
};
