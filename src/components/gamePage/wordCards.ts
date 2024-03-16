import { GameData } from '../../types/interfaces';
import { renderElement } from '../renderElement';

import { arraysAreEqual } from '../../utils/arrayUtils';
import { state } from '../app/app';
import { showHintContent } from './gamePage';

export const getWordCards = async (level: string): Promise<GameData | void> => {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${level}.json`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

export const isAnswerAccurate = (sentence: number) => {
  const continueButton = document.querySelector('.continue-button') as HTMLButtonElement;
  const checkButton = document.querySelector('.check-button') as HTMLButtonElement;
  // const hintIcon = document.querySelector('.translation-container .icon') as HTMLElement;

  if (continueButton) {
    if (state.answerArr && arraysAreEqual(state.answerArr, state.resultArr[sentence])) {
      continueButton.style.display = 'inline-block';
      continueButton.disabled = false;
      checkButton.style.display = 'none';

      showHintContent('text', false);
      showHintContent('audio', false);
    } else {
      continueButton.disabled = true;
      continueButton.style.display = 'none';
      checkButton.style.display = 'inline-block';
    }
  }
};

const isResultRowFilled = (row: HTMLElement) => {
  const checkButton = document.querySelector('.check-button') as HTMLButtonElement;
  if (state.resultArr[state.currentSentenceNum].every((el) => el !== '')) {
    checkButton.disabled = false;
  } else {
    checkButton.disabled = true;
    Array.from(row.children).forEach((childElement) => {
      childElement.classList.remove('correct');
      childElement.classList.remove('incorrect');
    });
  }
};

export const wordClickHandler = (e: Event, index: number) => {
  const resultBlock = document.querySelector('.result-field') as HTMLElement;
  const sourceBlock = document.querySelector('.source-container') as HTMLElement;
  const wordElement = e.target as HTMLElement;
  const resultRow = document.querySelector(`[data-sentence="${state.currentSentenceNum}"]`) as HTMLElement;
  if (sourceBlock.contains(wordElement)) {
    let foundEmptyElement = false;
    state.resultArr[state.currentSentenceNum].forEach((el, i) => {
      if (!el && !foundEmptyElement) {
        foundEmptyElement = true;
        state.resultArr[state.currentSentenceNum][i] = state.sourceArr[state.currentSentenceNum][index];
        state.sourceArr[state.currentSentenceNum][index] = '';
        resultRow.children[i].innerHTML = state.resultArr[state.currentSentenceNum][i];
        wordElement.innerHTML = '';
      }
    });
  } else if (resultBlock.contains(wordElement)) {
    let foundEmptyElement = false;
    state.sourceArr[state.currentSentenceNum].forEach((el, i) => {
      if (!el && !foundEmptyElement) {
        foundEmptyElement = true;
        state.sourceArr[state.currentSentenceNum][i] = state.resultArr[state.currentSentenceNum][index];
        state.resultArr[state.currentSentenceNum][index] = '';
        sourceBlock.children[i].innerHTML = state.sourceArr[state.currentSentenceNum][i];
        wordElement.innerHTML = '';
      }
    });
  }
  isResultRowFilled(resultRow);
  isAnswerAccurate(state.currentSentenceNum);
};

export const renderSourceCards = (wordsArr: string[]) => {
  const wordsContainer = document.querySelector('.source-container');
  if (wordsContainer) {
    wordsContainer.innerHTML = '';
    wordsArr.forEach((word, index) => {
      const wordCard = renderElement('p', 'word-card', wordsContainer as HTMLElement, {
        innerText: word,
      });
      state.resultArr[state.currentSentenceNum].push('');
      wordCard.addEventListener('click', (e) => wordClickHandler(e, index));
    });
  }
};
