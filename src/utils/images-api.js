import axios from 'axios';

const BASE_URL = 'https://pixabay.com/apiiji/';
const API_KEY = '41545079-e9b3a4168a776ff0916b92321';

export async function getImages(query) {
  const options = {
    method: 'get',
    baseURL: BASE_URL,
    params: {
      key: API_KEY,
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: 1,
      per_page: 40,
    },
  };

  const response = await axios(options);

  return response;
}
