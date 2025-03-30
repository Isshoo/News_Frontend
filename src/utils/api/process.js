import { BASE_URL } from '../config';

export const splitDataset = async (test_size) =>{
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

};

export const trainModel = async (test_size, n_neighbors) => {
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
};
