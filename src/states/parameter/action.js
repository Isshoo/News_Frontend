// redux/parameter/action.js
export const SET_PARAMETER = 'SET_PARAMETER';

export const setParameter = (params) => ({
  type: SET_PARAMETER,
  payload: params,
});
