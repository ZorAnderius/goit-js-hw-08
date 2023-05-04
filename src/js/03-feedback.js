const throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';

const ref = {
  submitFormEl: document.querySelector('.feedback-form'),
  emailInputEl: document.querySelector('input[name="email"]'),
  txtAreaEl: document.querySelector('textarea[name="message"]'),
};

let formData = {};

ref.submitFormEl.addEventListener('input', throttle(onInputForm, 500));

function onInputForm(e) {
  const nameOfInputField = e.target.name;
  const valueOfInputField = e.target.value;
  formData[nameOfInputField] = valueOfInputField;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

addDataToLocalStorage();

function addDataToLocalStorage() {
  const dataFromForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (dataFromForm) {
    ref.emailInputEl.value = dataFromForm.email;
    ref.txtAreaEl.value = dataFromForm.message;
  }
}

ref.submitFormEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  const email = ref.emailInputEl.value;
  const message = ref.txtAreaEl.value;

  if (!email && !message) {
    alert('Please enter a valid email and write a message');
    return;
  } else if (!email) {
    alert('Please enter a valid email');
    return;
  } else if (!message) {
    alert('Please write a message');
    return;
  }

  const saveData = localStorage.getItem(STORAGE_KEY);
  const formDataSubmit = JSON.parse(saveData);
  console.log(formDataSubmit);

  localStorage.removeItem(STORAGE_KEY);
  formData = {};
  e.currentTarget.reset();
}
