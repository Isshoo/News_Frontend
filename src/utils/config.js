const BASE_URL = 'http://127.0.0.1:8000';

async function _fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export {
  BASE_URL,
  _fetchWithAuth,
  putAccessToken,
  getAccessToken
};