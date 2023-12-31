import Notiflix from 'notiflix';

import { refs } from './utils/refs';
import { getImages } from './utils/images-api';
import createMarkup from './utils/card-template';

refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const request = e.target.elements.searchQuery.value;

  createGallery(request);
}

async function createGallery(userQuery) {
  try {
    const response = await getImages(userQuery);
    console.log(response);
    const imagesArr = response.data.hits;

    createMarkup(imagesArr);
  } catch (error) {
    console.log(error);
  }
}
