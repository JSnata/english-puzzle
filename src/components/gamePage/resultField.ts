import { renderElement } from '../renderElement';
import { state } from '../app/app';
import { wordClickHandler } from './wordCards';

export const renderResultRow = (sentence: number) => {
  console.log(state);

  const field = document.querySelector('.result-field') as HTMLElement;
  const rowContainer = renderElement('div', 'row-container', field);
  rowContainer.dataset.sentence = String(sentence);
  state.resultArr[sentence].forEach((word, index) => {
    const resultWordCard = renderElement('p', 'word-card empty', rowContainer, {
      innerText: word,
    });
    resultWordCard.addEventListener('click', (e) => wordClickHandler(e, index));
  });
};

export const renderResultField = (sentence: number) => {
  const gameContainer = document.querySelector('.game-container') as HTMLElement;
  renderElement('div', 'result-field', gameContainer);
  renderResultRow(sentence);
};
