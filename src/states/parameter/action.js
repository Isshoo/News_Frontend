// redux/parameter/action.js
export const SET_PARAMETER = 'SET_PARAMETER';
export const RESET_PARAMETER = 'RESET_PARAMETER';

export const setParameter = ({ modelId, n_neighbors, split_size, train_size, test_size, train_per_topic, test_per_topic }) => ({
  type: SET_PARAMETER,
  payload: { modelId, n_neighbors, split_size, train_size, test_size, train_per_topic, test_per_topic },
});

export const resetParameter = () => ({
  type: RESET_PARAMETER,
});
