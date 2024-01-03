import Notiflix from 'notiflix';

import getImages from '../utils/images-api';
import createMarkup from '../utils/markup-template';

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

    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
  } catch (error) {
    console.log(error);

    Notiflix.Notify.failure('Ooops, something went wrong!');
  }
}

export default createGallery;
