// redux/knn/action.js
export const SET_KNN = 'SET_KNN';
export const RESET_KNN = 'RESET_KNN';

export const setKNN = ({ data, pagination }) => ({
  type: SET_KNN,
  payload: { data, pagination },
});

export const resetKNN = () => ({
  type: RESET_KNN,
});
