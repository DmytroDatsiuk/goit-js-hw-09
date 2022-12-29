// import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', promisesGenerator);

function promisesGenerator(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget.elements;

  createPromise(1, Number(delay.value))
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

  for (let i = 2; i <= Number(amount.value); i++) {
    createPromise(i, Number(step.value) * (i - 1)+ Number(delay.value))
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
  }
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
