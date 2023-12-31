import { getImages } from './utils/images-api';
import { createMarkup } from './utils/card-template';

async function createGallery(query) {
  try {
    const response = await getImages(query);
    const imagesArr = response.data.hits;

    createMarkup(imagesArr);
  } catch (error) {
    console.log(error);
  }
}

createGallery('dog');
