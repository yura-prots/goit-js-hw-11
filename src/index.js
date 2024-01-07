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
refs.loader.classList.add('is-hidden');

let searchQuery = '';
let pageToShow = null;
let lastPage = null;
let perPage = 40;

async function onFormSubmit(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.loader.classList.remove('is-hidden');
  refs.searchBtn.setAttribute('disabled', '');

  pageToShow = 1;

  searchQuery = e.target.elements.searchQuery.value;
  if (searchQuery === '') {
    refs.searchBtn.removeAttribute('disabled');
    refs.loader.classList.add('is-hidden');

    Notiflix.Notify.info('Give me some query to search.');

    return;
  }

  try {
    const response = await getImages(searchQuery, pageToShow, perPage);

    if (response.data.hits.length === 0) {
      refs.loader.classList.add('is-hidden');

      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    createMarkup(response.data.hits);
    lightbox.refresh();

    refs.searchBtn.removeAttribute('disabled');
    refs.loader.classList.add('is-hidden');
    refs.loadMoreBtn.classList.remove('is-hidden');

    lastPage = Math.ceil(response.data.totalHits / perPage);

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
  refs.searchBtn.removeAttribute('disabled');
  refs.loader.classList.add('is-hidden');
}
