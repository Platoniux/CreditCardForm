'use strict'

const container = document.querySelector('.container')
const form = document.getElementById('credit-card-form');
const cardNumber = form.querySelector('.js-card-number');
const cardName = form.querySelector('.js-cust-name');
const cardDate = form.querySelector('.js-card-date');
const cardCvv = form.querySelector('.js-card-cvv');
const checkBox = form.querySelector('.js-checkbox-for-email');
const cardEmail = form.querySelector('.js-cust-email');
const submitButton = form.querySelector('.js-form-button');
const errorCardNumber = form.querySelector('.js-error-msg-card-number');
const errorCustName = form.querySelector('.js-error-msg-customer-name');
const errorDate = form.querySelector('.js-error-msg-date');
const errorCvv = form.querySelector('.js-error-msg-cvv');
const errorEmail = form.querySelector('.js-error-msg-cust-email');
const completeMsg = document.querySelector('.js-completion');
const loader = document.querySelector('.loader');

form.noValidate = true;
form.addEventListener('submit', loadAndNextValidation);
form.addEventListener('blur', function(event) {
  unsetRedBorder();
}, true);
checkBox.addEventListener('change', function(event) {
  openEmailField(cardEmail);
});

function loadAndNextValidation(event) {
  let mainEvent = event;
  mainEvent.preventDefault();
  container.classList.add('js-display-none');
  loader.classList.remove('js-display-none');
  setTimeout(validationOfForm, 2000, mainEvent);
}

function validationOfForm(event) {
  let results = [];
  results.push(
    cardNumberValidation(cardNumber, errorCardNumber),
    customerNameValidation(cardName, errorCustName),
    dateValidation(cardDate, errorDate),
    cvvValidation(cardCvv, errorCvv),
    emailValidation(cardEmail, errorEmail)
    )
  if (results.every(i => i === false)) {
    container.classList.remove('js-display-none');
    loader.classList.add('js-display-none');
    form.classList.add('js-display-none');
    completeMsg.classList.remove('js-display-none');
  } else {
    container.classList.remove('js-display-none');
    loader.classList.add('js-display-none');
  }
}



function cardNumberValidation(cardNumField, errorField) {
  let reg = /^[0-9]{16}$/;
  let value = cardNumber.value;
  if (cardNumField.required) {
    if (!value) {
      cardNumField.style.borderWidth = 'thin';
      cardNumField.style.borderColor = 'red';
      errorField.textContent = 'Please enter your credit card number.';
      return true;
    } else if (!reg.test(value)) {
      cardNumField.style.borderWidth = 'thin';
      cardNumField.style.borderColor = 'red';
      errorField.textContent = 'Credit card number is invalid.';
      return true;
    }
  }
  return false;
}

function customerNameValidation(nameField, errorField) {
  let reg = /^[A-Za-z\s]+$/;
  if (nameField.required) {
    if (!reg.test(nameField.value)) {
      nameField.style.borderWidth = 'thin';
      nameField.style.borderColor = 'red';
      errorField.textContent = 'Please enter your name.';
      return true;
    }
  }
  return false;
}


function dateValidation(dateField, errorField) {
  let reg = /\d*([\/]?\d+)/;
  let someday = new Date();
  let today = new Date();
  let value = dateField.value;
  let exYear = +('20' + dateField.value.slice(3));
  let exMonth = (dateField.value.slice(0, 2) - 1);
  someday = someday.setFullYear(exYear, exMonth, 1);
  if (dateField.required) {
    if ((value.length < 5) || !(reg.test(dateField.value)) || (someday < today)) {
      dateField.style.borderWidth = 'thin';
      dateField.style.borderColor = 'red';
      errorField.textContent = 'Date is invalid';
      return true;
    }
  }
  return false;
}

function cvvValidation(cvvField, errorField) {
  let reg = /^[0-9]{3,4}$/;
  if (cvvField.required) {
    if (!reg.test(cvvField.value)) {
      cvvField.style.borderWidth = 'thin';
      cvvField.style.borderColor = 'red';
      errorField.textContent = 'CVV is invalid';
      return true;
    }
  }
  return false;
}

function emailValidation(email, errorField) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.classList.contains('js-display-none')) {
    if (email.required) {
      if (!email.value) {
        email.style.borderWidth = 'thin';
        email.style.borderColor = 'red';
        errorField.textContent = 'Please enter your email.';
        return true;
      } else if (!reg.test(email.value)) {
        email.style.borderWidth = 'thin';
        email.style.borderColor = 'red';
        errorField.textContent = 'Email is invalid.';
        return false;
      }
    }
  }  
  return false;
}

function openEmailField(emailField, errorEmail) {
  let target = event.target;
  if (target.checked) {
    emailField.classList.remove('js-display-none');
    errorEmail.classList.remove('js-display-none');
  } else {
    emailField.classList.add('js-display-none');
    errorEmail.classList.add('js-display-none');
  }
}

function unsetRedBorder() {
  let target = event.target;
  let errorField = target.previousElementSibling;
  if (target.style.borderColor) {
    target.style.borderColor = '';
    target.style.borderWidth = '';
    errorField.textContent = '';
  }
}






