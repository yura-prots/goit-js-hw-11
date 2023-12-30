import getImages from './utils/images-api';
import createCard from './utils/card-template';

getImages('cat')
  .then(response => {
    const imagesArr = response.data.hits;
    const gallery = document.querySelector('.gallery');

    imagesArr.forEach(image => {
      const imageCard = createCard(image);

      gallery.insertAdjacentHTML('afterbegin', imageCard);
    });
  })
  .catch(error => {
    console.log(error);
  });
