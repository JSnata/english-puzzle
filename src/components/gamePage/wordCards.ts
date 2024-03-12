import { GameData } from '../../types/interfaces';
import { renderElement } from '../renderElement';

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

const shuffleArray = (array: string[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// const wordClickHandler = (e: Event) => {
//   const resultBlock = document.querySelector('.result-field') as HTMLElement;

//   resultBlock.appendChild(e.target);
// }

export const renderWordCards = async (level: string) => {
  const gameContainer = document.querySelector('.game-container') as HTMLElement;
  const resultBlock = document.querySelector('.result-field') as HTMLElement;
  const data = await getWordCards(level);
  const wordsContainer = renderElement('div', 'words-container', gameContainer);

  if (data) {
    const sentence = data.rounds['0'].words[0];
    const wordsArr = sentence.textExample.split(' ');
    const shuffledWordsArr = shuffleArray(wordsArr);

    shuffledWordsArr.forEach((word) => {
      const wordCard = renderElement('p', 'word-card', wordsContainer, {
        innerText: word,
      });
      wordCard.addEventListener('click', () => {
        resultBlock.appendChild(wordCard);
      });
    });
  }
};
