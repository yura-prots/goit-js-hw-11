import refs from './utils/refs';
import createGallery from './utils/create-gallery';
import getImages from './utils/images-api';

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = '';

function onFormSubmit(e) {
  e.preventDefault();

  searchQuery = e.target.elements.searchQuery.value;

  createGallery(searchQuery);
}

async function onLoadMore() {
  try {
    const response = await getImages(searchQuery);

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
