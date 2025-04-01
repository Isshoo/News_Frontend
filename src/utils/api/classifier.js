import { BASE_URL } from '../config';

const predict = async ({ text, model_path }) => {
  const response = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text, model_path: model_path }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Server error');
  }

  const responseJson = await response.json();

  return responseJson;
};

export { predict };