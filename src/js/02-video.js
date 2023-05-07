import Player from '@vimeo/player';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onCheckTimeUpdate, 1000));

function onCheckTimeUpdate(event) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(event.seconds)
  );
}

const getDataFromStorage = localStorage.getItem('videoplayer-current-time');
const parsData = JSON.parse(getDataFromStorage);

console.log(parsData);

player
  .setCurrentTime(parsData)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(error.message);
        break;

      default:
        console.log(`${error.message}It is not a number`);
        break;
    }
  });
