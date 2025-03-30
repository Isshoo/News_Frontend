import { BASE_URL } from '../config';

export const fetchPreprocessedDataset = async (page, limit) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/data?page=${page}&limit=${limit}`);
    const responseJson =  await response.json();
    return {
      data: responseJson.data,
      totalPages: responseJson.total_pages,
    };
  } catch (error) {
    return { error: 'Failed to fetch dataset.' };
  }
};

export const fetchPreprocessedDatasetInfo = async () =>  {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/data`);
    const responseJson = await response.json();
    return {
      totalData: responseJson.total_data,
      topicCounts: responseJson.topic_counts,
    };
  } catch (error) {
    return { error: 'Failed to fetch dataset.' };
  }
};

export const preprocessDataset = async () =>  {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocess`, {
      method: 'POST',
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to preprocess dataset.' };
  }
};

export const updateLabel = async (index, newLabel) =>{
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/update`, {
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

export const deleteData = async (index) =>{
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/delete`, {
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

export const addData = async (contentSnippet, topik) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/add`, {
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
