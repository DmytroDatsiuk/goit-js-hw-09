import throttle from 'lodash.throttle';
import { save } from './storage';
import { load } from './storage';

const refs = {
  form: document.querySelector('.js-feadback-form'),
  input: document.querySelector('.js-feadback-form input'),
  textarea: document.querySelector('.js-feadback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onEmailAndMessageInput, 500));

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();

  if (formData.email === '') {
    return;
  }
  if (formData.message === '') {
    return;
  }

  console.log(populateTextarea());
  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';
}

function onEmailAndMessageInput(evt) {
  formData[evt.target.name] = evt.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
//   save(STORAGE_KEY, formData);
}

function populateTextarea() {
//     load(STORAGE_KEY);

//   refs.input.value = serializedState.email;
//   refs.textarea.value = serializedState.message;

//   formData.email = serializedState.email;
//   formData.message = serializedState.message;

//   return serializedState;

  const savedMessage = localStorage.getItem(STORAGE_KEY);


  if (savedMessage) {
    const savedEmailAndPassword = JSON.parse(savedMessage);

    refs.input.value = savedEmailAndPassword.email;
    refs.textarea.value = savedEmailAndPassword.message;

    formData.email = savedEmailAndPassword.email;
    formData.message = savedEmailAndPassword.message;

    return savedEmailAndPassword;
  }
}
