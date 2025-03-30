import { BASE_URL } from '../config';

export async function fetchDataset(page, limit) {
  try {
    const response = await fetch(`${BASE_URL}/dataset/data?page=${page}&limit=${limit}`);
    const responseJson =  await response.json();
    return {
      data: responseJson.data,
      totalPages: responseJson.total_pages,
    };
  } catch (error) {
    return { error: 'Failed to fetch dataset.' };
  }
}

export async function fetchDatasetInfo() {
  try {
    const response = await fetch(`${BASE_URL}/dataset/data`);
    const responseJson = await response.json();
    return {
      totalData: responseJson.total_data,
      topicCounts: responseJson.topic_counts,
    };
  } catch (error) {
    return { error: 'Failed to fetch dataset.' };
  }
}

export async function uploadDataset(file) {
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
}
