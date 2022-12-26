// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'; 

const galleryList = document.querySelector('.gallery');

const imageItem = galleryItems
  .map(
    ({ preview, original, description }) =>
      `
        <a class='gallery__link' href='${original}'>
        <img class='gallery__image' src='${preview}' alt='${description}'/>
        </a>
        `
  )
  .join('');

galleryList.insertAdjacentHTML('beforeend', imageItem);

let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
