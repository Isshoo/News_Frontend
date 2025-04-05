import { BASE_URL } from '../config';

export const preprocessDataset = async (raw_dataset_id) =>  {
  try {
    const response = await fetch(`${BASE_URL}/dataset/${raw_dataset_id}/preprocess`, {
      method: 'POST',
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to preprocess dataset.' };
  }
};

export const createPreprocessedCopy = async (raw_dataset_id, name) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/${raw_dataset_id}/preprocessed/copy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to create copy.' };
  }
};

export const fetchPreprocessedDatasets = async (raw_dataset_id) =>  {
  try {
    const response = await fetch(`${BASE_URL}/dataset/${raw_dataset_id}/preprocessed/list`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to fetch dataset.' };
  }
};

export const fetchPreprocessedDataset = async (dataset_id, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/${dataset_id}?page=${page}&limit=${limit}`);
    return await response.json();
  } catch (error) {
    return { error: 'Failed to fetch dataset.' };
  }
};

export const deletePreprocessedDataset = async (dataset_id) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/${dataset_id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to delete dataset.' };
  }
};

export const updateLabel = async (dataset_id, index, newLabel) =>{
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/${dataset_id}/label`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index: index, topik: newLabel }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to update label.' };
  }
};

export const deleteData = async (dataset_id, index) =>{
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/${dataset_id}/data`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index: index }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to delete data.' };
  }
};

export const addData = async (dataset_id, contentSnippet, topik) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/${dataset_id}/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contentSnippet: contentSnippet, topik: topik }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to add data.' };
  }

};
