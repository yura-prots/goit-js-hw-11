import getImages from './utils/images-api';
import createCard from './utils/card-template';

getImages('cat')
  .then(response => {
    const gallery = document.querySelector('.gallery');

    const imageCard = createCard({ ...response.data.hits[0] });

    gallery.insertAdjacentHTML('afterbegin', imageCard);
  })
  .catch(error => {
    console.log(error);
  });

const options = {
  webformatURL: 'https://web.net',
  tags: 'qawsedrf',
  likes: 12,
  views: 34,
  comments: 56,
  downloads: 78,
};

console.log();
