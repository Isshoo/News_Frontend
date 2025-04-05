import {
  setModels,
  setLoading,
  setClassificationResult,
  setPrediction,
  updateClassificationRow,
} from './action';
import { predictCsv, predict } from '../../utils/api/classifier';
import { getModels } from '../../utils/api/model';

export const fetchModels = () => async (dispatch) => {
  try {
    const response = await getModels();
    if (response.error) {
      throw new Error('Failed to fetch models');
    }
    dispatch(setModels(response));
  } catch (error) {
    console.error('Failed to fetch models:', error);
  }
};

export const classifyNews = (text, retryCount = 4) => async (dispatch, getState) => {
  if (retryCount <= 0) {
    console.warn('DeepSeek prediction failed after multiple retries.');
    dispatch(setLoading(false));
    return;
  }

  dispatch(setLoading(true));
  const { selectedModelPath } = getState().classifier;
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

  dispatch(setPrediction(response.Hybrid_C5_KNN, response.DeepSeek, response.Preprocessed_Text));
  dispatch(setLoading(false));
};

export const classifyCsvThunk = () => async (dispatch, getState) => {
  const { classifier } = getState();
  const { csvData, selectedModelPath } = classifier;

  dispatch(setLoading(true));
  try {
    const csvContent = csvData.map((row) => `"${row.contentSnippet}","${row.topik}"`).join('\n');
    const csvBlob = new Blob([`"contentSnippet","topik"\n${csvContent}`], { type: 'text/csv' });
    const csvFile = new File([csvBlob], 'classification-result.csv', { type: 'text/csv' });

    const response = await predictCsv(csvFile, selectedModelPath);
    if (response.error) {
      throw new Error('Failed to classify CSV');
    }
    dispatch(setClassificationResult(response));
  } catch (err) {
    alert('Gagal mengklasifikasikan CSV');
    console.error(err);
  }
  dispatch(setLoading(false));
};

export const classifyRowThunk = (index, contentSnippet) => async (dispatch, getState) => {
  const { classifier } = getState();
  const { selectedModelPath } = classifier;
  try {
    const response = await predict({ text: contentSnippet, model_path: selectedModelPath });
    if (response.error) {
      throw new Error('Failed to classify row');
    }
    dispatch(updateClassificationRow(index, 'DeepSeek', response?.DeepSeek || '-'));
  } catch (err) {
    alert('Gagal mengklasifikasikan baris.');
    console.error(err);
  }
};
