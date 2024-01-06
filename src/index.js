import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import refs from './utils/refs';
import getImages from './utils/images-api';
import createMarkup from './utils/markup-template';

const lightbox = new SimpleLightbox('.gallery a');

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.searchInput.addEventListener('input', onInputChange);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.classList.add('is-hidden');

let searchQuery = '';
let pageToShow = 1;
let perPage = 40;
let lastPage = null;

async function onFormSubmit(e) {
  e.preventDefault();
  resetGallery();

  refs.searchBtn.classList.add('is-hidden');

  searchQuery = e.target.elements.searchQuery.value;
  if (searchQuery === '') {
    refs.searchBtn.classList.remove('is-hidden');

    Notiflix.Notify.info('Give me some query to search.');

    return;
  }

  try {
    const response = await getImages(searchQuery, pageToShow, perPage);

    if (response.data.hits.length === 0) {
      refs.searchBtn.classList.remove('is-hidden');

      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    createMarkup(response.data.hits);
    lightbox.refresh();

    lastPage = Math.ceil(response.data.totalHits / perPage);

    refs.loadMoreBtn.classList.remove('is-hidden');

    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
  } catch (error) {
    console.log(error);

    Notiflix.Notify.failure('Ooops, something went wrong!');
  }
}

async function onLoadMore() {
  if (pageToShow === lastPage) {
    refs.loadMoreBtn.classList.add('is-hidden');

    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );

    return;
  }

  pageToShow += 1;
  searchQuery = refs.searchForm.elements.searchQuery.value;

  try {
    const response = await getImages(searchQuery, pageToShow, perPage);

    createMarkup(response.data.hits);
    lightbox.refresh();
  } catch (error) {
    console.log(error);

    Notiflix.Notify.failure('Ooops, something went wrong!');
  }
}

function onInputChange() {
  refs.searchBtn.classList.remove('is-hidden');
}

function resetGallery() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
  pageToShow = 1;
}
