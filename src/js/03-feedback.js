const throttle = require('lodash.throttle');

const ref = {
  submitFormEl: document.querySelector('.feedback-form'),
  emailInputEl: document.querySelector('input[name="email"]'),
  txtAreaEl: document.querySelector('textarea[name="message"]'),
};
let formData = {};
let isEmpty = false;

ref.submitFormEl.addEventListener('input', throttle(onInputForm, 500));

function onInputForm(e) {
  const nameOfInputField = e.target.name;
  const valueOfInputField = e.target.value;
  formData[nameOfInputField] = valueOfInputField;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

addDataToLocalStorage();

function addDataToLocalStorage() {
  formData = JSON.parse(localStorage.getItem('feedback-form-state'));
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

  checkInputField(email, message);
  if (isEmpty) {
    isEmpty = false;
    return;
  }

  const saveData = localStorage.getItem('feedback-form-state');
  const formDataSubmit = JSON.parse(saveData);
  console.log(formDataSubmit);

  localStorage.removeItem('feedback-form-state');
  formData = {};

  e.currentTarget.reset();
}

function checkInputField(email, message) {
  isEmpty = true;
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
}
