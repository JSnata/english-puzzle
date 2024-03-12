import { logout } from './../../utils/localStorageUtils';
import { renderResultField } from './resultField';
import { renderWordCards } from './wordCards';
import { renderElement } from '../renderElement';

export const renderGamePage = () => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  mainContainer.innerHTML = '';
  const mainHeader = renderElement('div', 'main-header', mainContainer);
  const logoutButton = renderElement('button', 'primary-button logout-button', mainHeader, {
    type: 'button',
    innerText: 'Logout',
  });
  logoutButton.addEventListener('click', () => logout());

  renderElement('div', 'game-container', mainContainer);
  renderResultField();
  renderWordCards('1');
};
