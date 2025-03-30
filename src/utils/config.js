const BASE_URL = 'http://127.0.0.1:8000';

const _fetchWithAuth = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

const putAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export {
  BASE_URL,
  _fetchWithAuth,
  putAccessToken,
  getAccessToken
};