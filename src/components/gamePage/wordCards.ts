import { GameData } from '../../types/interfaces';
import { renderElement } from '../renderElement';
import { renderResultField } from './resultField';
import { state } from '../app/app';

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

const shuffleArray = (array: string[]): string[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const wordClickHandler = (e: Event, index: number) => {
  const resultBlock = document.querySelector('.result-field') as HTMLElement;
  const sourceBlock = document.querySelector('.source-container') as HTMLElement;
  const wordElement = e.target as HTMLElement;

  if (wordElement.parentNode === sourceBlock) {
    let foundEmptyElement = false;
    console.log([wordElement]);
    state.resultArr[0].forEach((el, i) => {
      if (!el && !foundEmptyElement) {
        foundEmptyElement = true;
        state.resultArr[0][i] = state.sourceArr[0][index];
        state.sourceArr[0][index] = '';
        resultBlock.children[i].innerHTML = state.resultArr[0][i];
        wordElement.innerHTML = '';
      }
    });
  } else if (wordElement.parentNode === resultBlock) {
    let foundEmptyElement = false;
    state.sourceArr[0].forEach((el, i) => {
      if (!el && !foundEmptyElement) {
        foundEmptyElement = true;
        state.sourceArr[0][i] = state.resultArr[0][index];
        state.resultArr[0][index] = '';
        sourceBlock.children[i].innerHTML = state.sourceArr[0][i];
        wordElement.innerHTML = '';
      }
    });
  }
};

export const renderWordCards = async (level: string) => {
  const gameContainer = document.querySelector('.game-container') as HTMLElement;
  const data = await getWordCards(level);
  const wordsContainer = renderElement('div', 'source-container', gameContainer);
  state.resultArr.push([]);
  if (data) {
    state.levelData = data;
    const sentence = data.rounds['0'].words[0];
    const wordsArr = sentence.textExample.split(' ');
    const shuffledWordsArr: string[] = shuffleArray(wordsArr);
    state.shuffledWordsArr = shuffledWordsArr;
    state.sourceArr.push(shuffledWordsArr);

    shuffledWordsArr.forEach((word, index) => {
      const wordCard = renderElement('p', 'word-card', wordsContainer, {
        innerText: word,
      });

      // wordCard.dataset.index = index.toString();

      state.resultArr[0].push('');
      wordCard.addEventListener('click', (e) => wordClickHandler(e, index));
    });

    renderResultField();
  }
};
