import Notiflix from 'notiflix';

import refs from './utils/refs';
import getImages from './utils/images-api';
import createMarkup from './utils/markup-template';

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.style.display = 'none';

let searchQuery = '';
let pageToShow = null;
let perPage = 3;

async function onFormSubmit(e) {
  e.preventDefault();
  resetGallery();

  searchQuery = e.target.elements.searchQuery.value;
  if (searchQuery === '') {
    Notiflix.Notify.info('Give me some query to search.');

    return;
  }

  try {
    const response = await getImages(searchQuery, pageToShow, perPage);

    if (response.data.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );

    createMarkup(response.data.hits);

    refs.loadMoreBtn.style.display = 'block';
  } catch (error) {
    console.log(error);

    Notiflix.Notify.failure('Ooops, something went wrong!');
  }
}

async function onLoadMore() {
  pageToShow += 1;
}

function resetGallery() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
  pageToShow = 1;
}
