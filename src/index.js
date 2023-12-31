import Notiflix from 'notiflix';

import { refs } from './utils/refs';
import { getImages } from './utils/images-api';
import createMarkup from './utils/card-template';

refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const request = e.target.elements.searchQuery.value;

  createGallery(request);

  refs.searchForm.reset();
}

async function createGallery(userQuery) {
  try {
    const response = await getImages(userQuery);
    const imagesArr = response.data.hits;

    if (!imagesArr.length) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    createMarkup(imagesArr);

    Notiflix.Notify.success(`Hooray! We found ${response.data.total} images.`);
  } catch (error) {
    console.log(error);

    Notiflix.Notify.failure('Ooops, something went wrong!');
  }
}
