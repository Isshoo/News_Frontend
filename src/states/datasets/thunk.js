// src/states/datasets/thunk.js

import {
  setDatasets,
  setDatasetsLoading,
  setDatasetsError,
} from './action';
import { getAllDatasets } from '../../utils/api/dataset';

export const asyncFetchDatasets = () => async (dispatch) => {
  dispatch(setDatasetsLoading(true));
  try {
    const datasets = await getAllDatasets(); // API GET
    dispatch(setDatasets(datasets));
  } catch (error) {
    dispatch(setDatasetsError(error.message));
  }
};
