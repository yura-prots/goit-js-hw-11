import { refs } from '../utils/refs';

function createMarkup(images) {
  images.forEach(image => {
    const imageCard = createCard(image);

    refs.gallery.insertAdjacentHTML('afterbegin', imageCard);
  });
}

function createCard({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
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

export default createMarkup;
