import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getImages from '../utils/images-api';
import createMarkup from '../utils/markup-template';

async function createGallery(userQuery, page) {
  const lightbox = new SimpleLightbox('.gallery a');

  try {
    const response = await getImages(userQuery, page);
    const imagesArr = response.data.hits;

    if (!imagesArr.length) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    createMarkup(imagesArr);
    lightbox.refresh();

    Notiflix.Notify.success(`Hooray! We found ${response.data.total} images.`);
  } catch (error) {
    console.log(error);

    Notiflix.Notify.failure('Ooops, something went wrong!');
  }
}

export default createGallery;
