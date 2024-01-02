import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import refs from './refs';

function createMarkup(images) {
  const markupStr = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
                <div class="photo-card">
                    <a href="${largeImageURL}">
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    </a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes: ${likes}</b>
                        </p>
                        <p class="info-item">
                            <b>Views: ${views}</b>
                        </p>
                        <p class="info-item">
                            <b>Comments: ${comments}</b>
                        </p>
                        <p class="info-item">
                            <b>Downloads: ${downloads}</b>
                        </p>
                    </div>
                </div>
            `;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('afterbegin', markupStr);

  new SimpleLightbox('.gallery a');
}

export default createMarkup;
