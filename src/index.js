import Notiflix from 'notiflix';

import refs from './utils/refs';
import createGallery from './utils/create-gallery';

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.style.display = 'none';

let searchQuery = '';
let pageToShow = null;

function onFormSubmit(e) {
  e.preventDefault();
  resetGallery();

  searchQuery = e.target.elements.searchQuery.value;
  if (!searchQuery) {
    Notiflix.Notify.info('Give me some query to search.');

    return;
  }

  createGallery(searchQuery, pageToShow);

  refs.loadMoreBtn.style.display = 'block';
}

function onLoadMore() {
  pageToShow += 1;

  createGallery(searchQuery, pageToShow);
}

function resetGallery() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
  pageToShow = 1;
}
