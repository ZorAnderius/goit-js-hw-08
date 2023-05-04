const throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';

const ref = {
  submitFormEl: document.querySelector('.feedback-form'),
  emailInputEl: document.querySelector('input[name="email"]'),
  txtAreaEl: document.querySelector('textarea[name="message"]'),
};

console.log(ref.submitFormEl);
console.log(ref.emailInputEl);
console.log(ref.txtAreaEl);
let formData = {};

ref.submitFormEl.addEventListener('input', throttle(onInputForm, 500));

function onInputForm(e) {
  const nameOfInputField = e.target.name;
  console.log(nameOfInputField);
  const valueOfInputField = e.target.value;
  console.log(e.target);
  console.log(valueOfInputField);
  formData[nameOfInputField] = valueOfInputField;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

addDataToLocalStorage();

function addDataToLocalStorage() {
  formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (formData) {
    ref.emailInputEl.value = formData.email;
    ref.txtAreaEl.value = formData.message;
  }
}

ref.submitFormEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  const email = ref.emailInputEl.value;
  const message = ref.txtAreaEl.value;

  // if (!email && !message) {
  //   alert('Please enter a valid email and write a message');
  //   return;
  // } else if (!email) {
  //   alert('Please enter a valid email');
  //   return;
  // } else if (!message) {
  //   alert('Please write a message');
  //   return;
  // }

  const saveData = localStorage.getItem(STORAGE_KEY);
  const formDataSubmit = JSON.parse(saveData);
  console.log(formDataSubmit);

  localStorage.removeItem(STORAGE_KEY);
  formData = {};

  e.currentTarget.reset();
}
