import { BASE_URL } from '../config';


export const getModels = async () => {
  try {
    const response = await fetch(`${BASE_URL}/process/models`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to get models.' };
  }
};

export const getModel = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/${modelId}`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to get model details.' };
  }
};

export const editModelName = async (modelId, newName) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/${modelId}/name`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_name: newName }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to edit model name.' };
  }
};

export const deleteModel = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/${modelId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to delete model.' };
  }
};

export const getModelParameters = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/${modelId}/parameters`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to get model parameters.' };
  }
};

export const getModelEvaluation = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/${modelId}/evaluation`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to get model evaluation.' };
  }
};

export const getWordStats = async (modelId, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/${modelId}/word-stats?page=${page}&limit=${limit}`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to get word stats.' };
  }
};

export const getTfidfStats = async (modelId, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/${modelId}/tfidf-stats?page=${page}&limit=${limit}`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to get TF-IDF stats.' };
  }
};

export const getNeighbors = async (modelId, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/${modelId}/neighbors?page=${page}&limit=${limit}`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to get nearest neighbors.' };
  }
};

export const getPredictResults = async (modelId, page = 1, limit = 10, predictBy = null) => {
  try {
    let url = `${BASE_URL}/process/model/${modelId}/predict-results?page=${page}&limit=${limit}`;
    if (predictBy) {
      url += `&predict_by=${predictBy}`;
    }

    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to get predict results.' };
  }
};




