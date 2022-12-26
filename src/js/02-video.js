import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

// throttle(player.on(), 1000)

player.on('timeupdate', throttle(localStTime, 1000));

function localStTime(currentTime) {
  if (currentTime) {
    localStorage.setItem('time', JSON.stringify(currentTime));
  }
}

const second = localStorage.getItem('time');

if (second) {
  const saveTime = JSON.parse(second);

  player
    .setCurrentTime(saveTime.seconds)
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;

        default:
          break;
      }
    });
}
