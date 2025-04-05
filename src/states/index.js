// src/states/index.js

import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';

import datasetsReducer from './datasets/reducer'; // tambahkan reducer baru jika ada

const store = configureStore({
  reducer: {
    datasets: datasetsReducer, // bisa nambahin ini juga
    loadingBar: loadingBarReducer,
  },
});

export default store;
