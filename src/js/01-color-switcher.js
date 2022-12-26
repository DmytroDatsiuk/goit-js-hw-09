const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;
let isActive = false;

refs.start.addEventListener('click', () => {
  if (isActive) {
    return;
  }
  isActive = true;

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stop.addEventListener('click', () => {
  clearInterval(timerId);
  isActive = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const currentDate = new Date()
console.log(currentDate.getDay())