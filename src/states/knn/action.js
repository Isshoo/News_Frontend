// redux/knn/action.js
export const SET_KNN = 'SET_KNN';

export const setKNN = (data) => ({
  type: SET_KNN,
  payload: data,
});
