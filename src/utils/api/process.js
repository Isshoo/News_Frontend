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
