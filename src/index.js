import getImages from './utils/images-api';
import createCard from './utils/card-template';

// console.log(getImages('black cat'));

const gallery = document.querySelector('.gallery');

const imageCard = createCard('https://web.net', 'qawsedrf', 12, 34, 56, 78);

gallery.insertAdjacentHTML('afterbegin', imageCard);

console.log();
