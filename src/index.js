import refs from './utils/refs';
import createGallery from './utils/create-gallery';
import getImages from './utils/images-api';

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = '';
let pageToShow = null;

function onFormSubmit(e) {
  e.preventDefault();

  pageToShow = 1;

  searchQuery = e.target.elements.searchQuery.value;

  createGallery(searchQuery, pageToShow);
}

function onLoadMore() {
  pageToShow += 1;

  createGallery(searchQuery, pageToShow);
}
