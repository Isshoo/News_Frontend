import { BASE_URL } from '../config';

const predict = async ({ text }) => {
  const response = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Server error');
  }

  const responseJson = await response.json();

  return responseJson;
};

export { predict };