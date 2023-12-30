import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41545079-e9b3a4168a776ff0916b92321';

export async function getImages(userQuery) {
  const options = {
    method: 'get',
    baseURL: BASE_URL,
    params: {
      key: API_KEY,
      q: `${userQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: 1,
      per_page: 40,
    },
  };

  try {
    const response = await axios(options);
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
}
