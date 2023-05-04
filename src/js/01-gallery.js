// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';


console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

const galleryStrMarkup = createGalleryMarkup(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', galleryStrMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class='gallery__item'>
        <a class='gallery__link' href='${original}'>
            <img class='gallery__image' src='${preview}' alt='${description}' />
        </a>
      </li>`
    )
    .join('');
}

new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionDelay: 250,
});
