// redux/parameters/thunk.js
import { setParameter, updateSplitSize } from './action';
import { getModelParameters } from '../../utils/api/model';
import { splitDataset } from '../../utils/api/process';

export const fetchParameters = (modelId) => async (dispatch) => {
  console.log(modelId);
  try {
    const response = await getModelParameters(modelId);
    if (response) {
      dispatch(setParameter({
        n_neighbors: response.n_neighbors,
        split_size: response.split_size,
        train_size: response.train_size,
        test_size: response.test_size,
        train_per_topic: response.train_per_topic,
        test_per_topic: response.test_per_topic,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch parameters:', error);
  }
};

export const updateParameter = (rawDatasetId, preprocessedDatasetId, newSplitSize) => async (dispatch) => {
  try {
    const response = await splitDataset(rawDatasetId, preprocessedDatasetId, newSplitSize);
    if (!response.error) {
      dispatch(updateSplitSize({
        split_size: newSplitSize,
        train_size: response.train_size,
        test_size: response.test_size,
        train_per_topic: response.train_per_topic,
        test_per_topic: response.test_per_topic,
      }));
    }
  }
  catch (error) {
    console.error('Failed to update parameter:', error);
  }
};
