import { BASE_URL } from '../config';

export const splitDataset = async (splitSize) =>{
  try {
    const response = await fetch(`${BASE_URL}/process/split`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test_size: splitSize }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to split dataset.' };
  }

};

export const trainModel = async (splitSize, n_neighbors) => {
  try {
    const response = await fetch(`${BASE_URL}/process/train`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test_size: splitSize, n_neighbors: n_neighbors }),
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to train model.' };
  }
};
