import { BASE_URL } from '../config';

const predict = async ({ text, model_path = '' }) => {
  const response = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, model_path }),
  });

  return await response.json();
};

const predictCsv = async (file, model_path = '') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('model_path', model_path);

  const response = await fetch(`${BASE_URL}/predict/csv`, {
    method: 'POST',
    body: formData,
  });


  return await response.json();
};

export { predict, predictCsv };
