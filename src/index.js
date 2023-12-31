import getImages from './utils/images-api';
import createCard from './utils/card-template';

async function createGallery(query) {
  try {
    const response = await getImages(query);
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
}

createGallery('cat');

// getImages('cat')
//   .then(response => {
//     const gallery = document.querySelector('.gallery');
//     const imagesArr = response.data.hits;

//     imagesArr.forEach(image => {
//       const imageCard = createCard(image);

//       gallery.insertAdjacentHTML('afterbegin', imageCard);
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });
