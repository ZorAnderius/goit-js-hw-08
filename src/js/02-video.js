import Player from '@vimeo/player';

const throttle = require('lodash.throttle');

console.log(Player);

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

player.setCurrentTime(parsData);
