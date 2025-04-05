// src/states/datasets/action.js
import {
  fetchDatasets,
  deleteDataset as apiDeleteDataset,
} from '../../utils/api/dataset';

const ActionType = {
  SET_DATASETS: 'SET_DATASETS',
  SET_LOADING: 'SET_LOADING',
};

function setDatasets(datasets) {
  return {
    type: ActionType.SET_DATASETS,
    payload: datasets,
  };
}

function setLoading(loading) {
  return {
    type: ActionType.SET_LOADING,
    payload: loading,
  };
}

function asyncFetchDatasets() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await fetchDatasets();
      dispatch(setDatasets(data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

function asyncDeleteDataset(id) {
  return async (dispatch, getState) => {
    try {
      await apiDeleteDataset(id);
      const { datasets } = getState().datasets;
      const updated = datasets.filter((ds) => ds.id !== id);
      dispatch(setDatasets(updated));
    } catch (error) {
      console.error(error);
    }
  };
}

export {
  ActionType,
  setDatasets,
  setLoading,
  asyncFetchDatasets,
  asyncDeleteDataset,
};
