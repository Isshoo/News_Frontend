import { BASE_URL } from '../config';

export async function splitDataset(test_size) {
  try {
    const response = await fetch(`${BASE_URL}/dataset/split`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test_size: test_size }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to split dataset.' };
  }

}

export async function trainModel(test_size, n_neighbors) {
  try {
    const response = await fetch(`${BASE_URL}/process/train`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test_size: test_size, n_neighbors: n_neighbors }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to train model.' };
  }
}
