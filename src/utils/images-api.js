import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41545079-e9b3a4168a776ff0916b92321';

export function fetchImages() {
  return getData(
    `${BASE_URL}/?key=${API_KEY}&q=yellow+flowers&image_type=photo`
  );
}

export function fetchCatByBreed(breedId) {
  return getData(`${BASE_URL}/images/search?breed_ids=${breedId}`);
}

export function onFetchError(error) {
  console.log(error);

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function getData(url) {
  //   axios.defaults.headers.common['x-api-key'] = API_KEY;

  return axios.get(url).then(response => {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  });
}
