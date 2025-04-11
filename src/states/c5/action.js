// redux/c5/action.js
export const SET_C5 = 'SET_C5';
export const RESET_C5 = 'RESET_C5';

export const setC5Stats = ({ data, pagination }) => ({
  type: SET_C5,
  payload: { data, pagination },
});

export const resetC5Stats = () => ({
  type: RESET_C5,
});
