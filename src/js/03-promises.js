// import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', promisesGenerator);

function promisesGenerator(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget.elements;

  let delayValue = Number(delay.value);

  for (let i = 1; i <= Number(amount.value); i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayValue += Number(step.value);
  }

  delay.value = '';
  step.value = '';
  amount.value = '';
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay);
  });

  return promise;
}
