import refs from './utils/refs';
import createGallery from './utils/create-gallery';

refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const request = e.target.elements.searchQuery.value;

  createGallery(request);
}
