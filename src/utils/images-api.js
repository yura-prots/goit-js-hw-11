import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41545079-e9b3a4168a776ff0916b92321';

export async function getImages(userSearch) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${userSearch}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
}
