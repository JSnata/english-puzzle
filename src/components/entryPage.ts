import { renderElement } from './renderElement';

const validateLoginForm = (
  inputName: 'Surname' | 'First name',
  input: HTMLInputElement,
  errorContainer: HTMLDivElement
) => {
  const сharRestricRegex = /^[a-zA-Z-]+$/;
  const firstLetterUppercaseRegex = /^[A-Z].*$/;
  const firstNameMinLengthRegex = /^.{3,}$/;
  const surnameMinLengthRegex = /^.{4,}$/;

  if (!сharRestricRegex.test(input.value)) {
    errorContainer.textContent = `${inputName} must contain only English alphabet letters and hyphen`;
    input.classList.add('error');
    return false;
  }

  if (!firstLetterUppercaseRegex.test(input.value)) {
    errorContainer.textContent = `${inputName} must start with an uppercase letter.`;
    input.classList.add('error');
    return false;
  }
  if (inputName === 'First name') {
    if (!firstNameMinLengthRegex.test(input.value)) {
      errorContainer.textContent = `${inputName} must have minimum length of 3`;
      input.classList.add('error');
      return false;
    }
  }

  if (inputName === 'Surname') {
    if (!surnameMinLengthRegex.test(input.value)) {
      errorContainer.textContent = `${inputName} must have minimum length of 4`;
      input.classList.add('error');
      return false;
    }
  }
  input.classList.remove('error');
  return true;
};

const loginFormHandler = (e: Event) => {
  e.preventDefault();
  const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
  const surnameInput = document.getElementById('surname') as HTMLInputElement;
  const firstNameError = document.getElementById('firstNameError') as HTMLDivElement;
  const surnameError = document.getElementById('surnameError') as HTMLDivElement;

  if (!firstNameError || !surnameError) {
    return;
  }

  firstNameError.textContent = '';
  surnameError.textContent = '';

  const firstNameValid = validateLoginForm('First name', firstNameInput, firstNameError);
  const surnameValid = validateLoginForm('Surname', surnameInput, surnameError);

  if (firstNameValid && surnameValid) {
    localStorage.setItem('firstName', firstNameInput.value);
    localStorage.setItem('surname', surnameInput.value);
  }
};

export const renderEntryForm = () => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  const formContainer = renderElement('div', 'form-container', mainContainer);
  const loginForm = renderElement('form', '', formContainer);

  loginForm?.setAttribute('novalidate', 'true');

  const firstNameInputContainer = renderElement('div', 'form-group', loginForm);
  const surnameInputContainer = renderElement('div', 'form-group', loginForm);
  renderElement('label', 'label', surnameInputContainer, {
    for: 'surname',
    innerText: 'Surname:',
  });
  renderElement('label', 'label', firstNameInputContainer, {
    for: 'firstName',
    innerText: 'First Name:',
  });

  const firstNameInput = renderElement('input', 'input', firstNameInputContainer, {
    type: 'text',
    id: 'firstName',
    name: 'firstName',
  });
  (firstNameInput as HTMLInputElement).required = true;
  renderElement('div', 'input-error-message', firstNameInputContainer, {
    id: 'firstNameError',
  });

  const surnameInput = renderElement('input', 'input', surnameInputContainer, {
    type: 'text',
    id: 'surname',
    name: 'surname',
  });
  (surnameInput as HTMLInputElement).required = true;
  renderElement('div', 'input-error-message', surnameInputContainer, {
    id: 'surnameError',
  });

  renderElement('button', 'primary-button', loginForm, {
    type: 'submit',
    innerText: 'Login',
  });
  loginForm?.addEventListener('submit', (e) => loginFormHandler(e));
};
