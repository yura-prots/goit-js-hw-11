import { getImages } from './utils/images-api';
import { createCard } from './utils/card-template';
import { refs } from './utils/refs';

const { searchForm, searchBtn, gallery } = refs;

async function createGallery(query) {
  try {
    const response = await getImages(query);
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
}

// createGallery('cat');
