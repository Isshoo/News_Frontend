import { BASE_URL } from '../config';

export const splitDataset = async (rawDatasetId, preprocessedDatasetId, splitSize) => {
  try {
    const response = await fetch(`${BASE_URL}/process/split/${preprocessedDatasetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw_dataset_id: rawDatasetId, test_size: splitSize }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to split dataset.' };
  }
};

export const trainModel = async (rawDatasetId, preprocessedDatasetId, name, splitSize, n_neighbors) => {
  try {
    const response = await fetch(`${BASE_URL}/process/train/${preprocessedDatasetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw_dataset_id: rawDatasetId, name, test_size: splitSize, n_neighbors }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to train model.' };
  }
};

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
