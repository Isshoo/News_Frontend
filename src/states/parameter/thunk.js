// redux/parameters/thunk.js
import { setParameters } from './action';
import { getModelParameters } from '../../utils/api/model';

export const fetchParameters = (modelId) => async (dispatch) => {
  try {
    const response = await getModelParameters(modelId);
    if (response) {
      dispatch(setParameters({
        modelId,
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
