import { renderElement } from '../renderElement';

export const renderResultField = () => {
  const gameContainer = document.querySelector('.game-container') as HTMLElement;
  renderElement('div', 'result-field', gameContainer);
};
