import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41545079-e9b3a4168a776ff0916b92321';

async function getImages(query, page) {
  const options = {
    method: 'get',
    baseURL: BASE_URL,
    params: {
      key: API_KEY,
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${page}`,
      per_page: 3,
    },
  };

  const response = await axios(options);

  return response;
}

export default getImages;
