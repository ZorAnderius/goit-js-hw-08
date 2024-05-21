const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

/**create markup for HTML from Array
 *
 * @param {Array} images
 * @returns {string}
 */
const createMarkup = images =>
  images
    .map(
      ({ preview, original, description }) =>
        `<li class="img-item">
            <a class="img-link" href="${original}">
                <img class="img-gallery"
                    src="${preview}" 
                    alt="${description}"
                    data-source="${original}">
            </a>
        </li>`
    )
    .join('');

/**add settings for basicLightbox and show modal windows with image
 *
 * @param {string} markup
 */
const showImg = markup => {
  instance = basicLightbox.create(markup, {
    onShow: () => window.addEventListener('keydown', hendlerEsc),
    onClose: () => window.removeEventListener('keydown', hendlerEsc),
  });
  instance.show();
};

// hendler press Ecscape button for close modal window
const hendlerEsc = e => {
  if (e.code === 'Escape') instance.close();
};

// hendler for show image after user presses om the picture
const hendlerSelectImg = e => {
  e.preventDefault();
  if (e.currentTarget !== e.target) {
    const img_markup = `<img 
    class="modal-img"
    src="${e.target.dataset.source}"
    alt="${e.target.getAttribute('alt')}" width="1112" height="640">`;
    showImg(img_markup);
  }
};

const gallRef = document.querySelector('.gallery');
let instance;

const markup = createMarkup(images);
gallRef.insertAdjacentHTML('afterbegin', markup);

gallRef.addEventListener('click', hendlerSelectImg);
