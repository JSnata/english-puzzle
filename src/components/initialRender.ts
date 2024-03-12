import { renderElement } from './renderElement';
import { renderEntryForm } from './entryPage';
import { renderStartPage } from './startPage';
import { getUserCredentials } from '../utils/localStorageUtils';

export const initialRender = () => {
  const userCredentials = getUserCredentials();
  document.body.innerHTML = '';
  renderElement('div', 'main-container', document.body, {
    id: 'mainContainer',
  });
  if (userCredentials) {
    renderStartPage(userCredentials);
  } else {
    renderEntryForm();
  }
};
