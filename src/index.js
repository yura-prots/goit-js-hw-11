import Notiflix from 'notiflix';

import refs from './utils/refs';
import getImages from './utils/images-api';
import createMarkup from './utils/markup-template';

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.style.display = 'none';

let searchQuery = '';
let pageToShow = 1;
let perPage = 40;
let lastPage = null;

async function onFormSubmit(e) {
  e.preventDefault();
  resetGallery();

  refs.searchBtn.style.display = 'none';

  searchQuery = e.target.elements.searchQuery.value;
  if (searchQuery === '') {
    refs.searchBtn.style.display = 'block';

    Notiflix.Notify.info('Give me some query to search.');

    return;
  }

  try {
    const response = await getImages(searchQuery, pageToShow, perPage);

    if (response.data.hits.length === 0) {
      refs.searchBtn.style.display = 'block';

      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    createMarkup(response.data.hits);

    lastPage = Math.ceil(response.data.totalHits / perPage);
    console.log(lastPage);

    refs.loadMoreBtn.style.display = 'block';

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
    refs.loadMoreBtn.style.display = 'none';

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
  } catch (error) {
    console.log(error);

    Notiflix.Notify.failure('Ooops, something went wrong!');
  }
}

function resetGallery() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
  pageToShow = 1;
}
