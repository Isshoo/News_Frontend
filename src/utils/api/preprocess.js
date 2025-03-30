import { BASE_URL } from '../config';

export async function fetchPreprocessedDataset(page, limit) {
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
}

export async function fetchPreprocessedDatasetInfo() {
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
}

export async function preprocessDataset() {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocess`, {
      method: 'POST',
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to preprocess dataset.' };
  }
}

export async function updateLabel(index, newLabel) {
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
}

export async function deleteData(index) {
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
}

export async function addData(contentSnippet, topik) {
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

}
