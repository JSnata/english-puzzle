import { saveGameProgress } from '../utils/localStorageUtils';
import { state } from './app/app';
import { renderGamePage } from './gamePage/gamePage';
import { renderElement } from './renderElement';

const continueGameButtonClickHandler = () => {
  state.currentRoundNum += 1;
  state.currentSentenceNum = 0;
  state.resultArr = [];
  state.sourceArr = [];
  saveGameProgress();
  renderGamePage(state.currentLevel, state.currentSentenceNum, state.currentRoundNum);
};

export const renderResultsPage = () => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  mainContainer.innerHTML = 'Results Page';

  const resultContainer = renderElement('div', 'result-container', mainContainer);

  const continueGameButton = renderElement('button', 'primary-button continue-game-button', resultContainer, {
    innerText: 'Continue game',
  }) as HTMLButtonElement;

  continueGameButton.addEventListener('click', () => continueGameButtonClickHandler());
};
