import { renderElement } from '../renderElement';
import { state } from '../app/app';
import { wordClickHandler } from './wordCards';

export const renderResultField = () => {
  const gameContainer = document.querySelector('.game-container') as HTMLElement;
  const resultField = renderElement('div', 'result-field', gameContainer);
  state.resultArr[0].forEach((word, index) => {
    const resultWordCard = renderElement('p', 'word-card empty', resultField, {
      innerText: word,
    });
    console.log(word);

    resultWordCard.addEventListener('click', (e) => wordClickHandler(e, index));
  });
};
