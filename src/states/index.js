// src/states/index.js

import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';

import datasetsReducer from './datasets/reducer';
import datasetDetailReducer from './datasetDetail/reducer';
import preprocessedDatasetsReducer from './preprocessedDatasets/reducer';
import parameterReducer from './parameter/reducer';
import vectorizedReducer from './vectorized/reducer';
import c5Reducer from './c5/reducer';
import knnReducer from './knn/reducer';
import evaluationReducer from './evaluation/reducer';

const store = configureStore({
  reducer: {
    datasets: datasetsReducer,
    datasetDetail: datasetDetailReducer,
    preprocessedDatasets: preprocessedDatasetsReducer,
    parameter: parameterReducer,
    vectorized: vectorizedReducer,
    c5: c5Reducer,
    knn: knnReducer,
    evaluation: evaluationReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
