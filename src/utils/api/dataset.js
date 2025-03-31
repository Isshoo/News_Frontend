import { BASE_URL } from '../config';

export const fetchDatasets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/list`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to fetch datasets.' };
  }
};

export const fetchDataset = async (dataset_id, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/${dataset_id}?page=${page}&limit=${limit}`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to fetch dataset.' };
  }
};

export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${BASE_URL}/dataset/upload`, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to upload dataset.' };
  }
};

export const deleteDataset = async (datasetId) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/${datasetId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to delete dataset.' };
  }
};
