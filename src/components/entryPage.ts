import { renderElement } from './renderElement';

export const renderEntryForm = () => {
  const mainContainer = document.querySelector('.main-container');
  const formContainer = renderElement('div', 'form-container', mainContainer as HTMLElement);
  renderElement('h2', '', formContainer, {
    innerText: 'RSS-PUZZLE',
  });
  const loginForm = renderElement('form', '', formContainer);
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
  // const firstNameInput
  const firstNameInput = renderElement('input', 'input', firstNameInputContainer, {
    type: 'text',
    id: 'firstName',
    name: 'firstName',
  });
  (firstNameInput as HTMLInputElement).required = true;
  // const surnameInput
  const surnameInput = renderElement('input', 'input', surnameInputContainer, {
    type: 'text',
    id: 'surname',
    name: 'surname',
  });
  (surnameInput as HTMLInputElement).required = true;
  renderElement('button', 'primary-button', loginForm, {
    type: 'submit',
    innerText: 'Login',
  });
};
