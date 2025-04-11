// redux/parameter/action.js
export const SET_PARAMETER = 'SET_PARAMETER';
export const RESET_PARAMETER = 'RESET_PARAMETER';
export const UPDATE_SPLIT_SIZE = 'UPDATE_SPLIT_SIZE';
export const UPDATE_N_NEIGHBORS = 'UPDATE_N_NEIGHBORS';

export const setParameter = ({ n_neighbors, split_size, train_size, test_size, train_per_topic, test_per_topic }) => ({
  type: SET_PARAMETER,
  payload: { n_neighbors, split_size, train_size, test_size, train_per_topic, test_per_topic },
});

export const resetParameter = () => ({
  type: RESET_PARAMETER,
});

export const updateSplitSize = ({ split_size, train_size, test_size, train_per_topic, test_per_topic }) => ({
  type: UPDATE_SPLIT_SIZE,
  payload: { split_size, train_size, test_size, train_per_topic, test_per_topic },
});

export const updateNNeighbors = (n_neighbors) => ({
  type: UPDATE_N_NEIGHBORS,
  payload: n_neighbors,
});
