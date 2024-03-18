import { saveGameProgress } from '../utils/localStorageUtils';
import { state } from './app/app';
import { renderGamePage } from './gamePage/gamePage';
import { renderElement } from './renderElement';

const continueGameButtonClickHandler = () => {
  state.currentRoundNum += 1;
  state.currentSentenceNum = 0;
  state.resultArr = [];
  state.sourceArr = [];
  state.unknownSentences = [];
  state.knownSentences = [];
  saveGameProgress();
  renderGamePage(state.currentLevel, state.currentSentenceNum, state.currentRoundNum);
};

export const renderResultsPage = () => {
  console.log(state);
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  mainContainer.innerHTML = '';
  const resultContainer = renderElement('div', 'result-container', mainContainer);
  const unKnownSentencesWrapper = renderElement('div', 'unknown-sentences-wrapper', resultContainer);
  renderElement('h2', 'heading-secondary', unKnownSentencesWrapper, {
    innerText: "I don't know",
  });
  state.unknownSentences.forEach((sentence) => {
    const text = state.levelData?.rounds[state.currentRoundNum].words[sentence].textExample;
    if (text) {
      renderElement('p', 'unknown-sentence', unKnownSentencesWrapper, {
        innerText: text,
      });
    }
  });
  const knownSentencesWrapper = renderElement('div', 'known-words', resultContainer);
  renderElement('h2', 'heading-secondary', knownSentencesWrapper, {
    innerText: 'I know',
  });
  state.knownSentences.forEach((sentence) => {
    const text = state.levelData?.rounds[state.currentRoundNum].words[sentence].textExample;
    if (text) {
      renderElement('p', 'known-sentence', knownSentencesWrapper, {
        innerText: text,
      });
    }
  });

  const continueGameButton = renderElement('button', 'primary-button continue-game-button', resultContainer, {
    innerText: 'Continue game',
  }) as HTMLButtonElement;
  continueGameButton.addEventListener('click', () => continueGameButtonClickHandler());
};
