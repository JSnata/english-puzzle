import { renderResultField } from './resultField';
import { renderWordCards } from './wordCards';
import { renderElement } from '../renderElement';

export const renderGamePage = () => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  mainContainer.innerHTML = '';
  renderElement('div', 'game-container', mainContainer);
  renderResultField();
  renderWordCards('1');
};
