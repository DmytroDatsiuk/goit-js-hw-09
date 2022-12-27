import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Number(selectedDates[0]) <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    refs.startButton.classList.remove('disable-timer');
    refs.startButton.classList.add('is-active-timer');


    refs.startButton.addEventListener('click', () => {
      setInterval(() => {
        const timerTime = Number(selectedDates[0]) - Date.now();

        refs.days.textContent = String(convertMs(timerTime).days).padStart(
          2,
          0
        );
        refs.hours.textContent = String(convertMs(timerTime).hours).padStart(
          2,
          0
        );
        refs.minutes.textContent = String(
          convertMs(timerTime).minutes
        ).padStart(2, 0);
        refs.seconds.textContent = String(
          convertMs(timerTime).seconds
        ).padStart(2, 0);
      }, 1000);
    });
  },
};

flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(convertMs(timerTime).hours).padStart(2, 0)
}
