import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41545079-e9b3a4168a776ff0916b92321';

export async function getImages() {
  try {
    const response = await axios.get(`${BASE_URL}/?key=${API_KEY}`);
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
}
