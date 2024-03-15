import { shuffleArray } from './../../utils/arrayUtils';
import { logout } from './../../utils/localStorageUtils';
import { getWordCards, isAnswerAccurate, renderSourceCards } from './wordCards';
import { renderResultField, renderResultRow } from './resultField';
import { renderElement } from '../renderElement';
import { state } from '../app/app';

export const manageWordsState = (sentence: number, round: number) => {
  if (state.levelData) {
    state.roundSentences = state.levelData.rounds[round].words;
    state.resultArr.push([]);
    state.currentTranslation = state.roundSentences[sentence].textExampleTranslate;
    state.currentSentenceNum = sentence;
    const currentSentence = state.roundSentences[sentence];
    const wordsArr = currentSentence.textExample.split(' ');
    const shuffledWordsArr: string[] = shuffleArray(wordsArr);
    state.answerArr = wordsArr;
    state.shuffledWordsArr = shuffledWordsArr;
    state.sourceArr.push(shuffledWordsArr);
  }
};

export const manageGameState = async (level: string, sentence: number, round: number) => {
  const data = await getWordCards(level);
  if (data) {
    state.levelData = data;
    manageWordsState(sentence, round);
  }
};

export const renderTranslationHint = () => {
  const translationHintContainer = document.querySelector('.translation-container') as HTMLElement;
  translationHintContainer.innerHTML = '';
  const hintIcon = renderElement('span', 'icon', translationHintContainer, {
    innerText: '?',
  });
  const translationElement = renderElement('p', 'text hidden', translationHintContainer, {
    innerText: state.currentTranslation,
  });
  hintIcon.addEventListener('click', () => {
    translationElement.classList.toggle('hidden');
  });
};

const continueButtonClickHandler = () => {
  const checkButton = document.querySelector('.check-button') as HTMLButtonElement;
  const resultRow = document.querySelector(`[data-sentence="${state.currentSentenceNum}"]`) as HTMLElement;
  Array.from(resultRow.children).forEach((childElement) => {
    childElement.classList.remove('correct');
    childElement.classList.remove('incorrect');
  });
  checkButton.disabled = true;

  if (state.currentSentenceNum < 1) {
    state.currentSentenceNum += 1;
  } else {
    const resultBlock = document.querySelector('.result-field') as HTMLElement;
    const sourceBlock = document.querySelector('.source-container') as HTMLElement;
    resultBlock.innerHTML = '';
    sourceBlock.innerHTML = '';
    state.currentRoundNum += 1;
    state.currentSentenceNum = 0;
    state.resultArr = [];
    state.sourceArr = [];
  }

  manageWordsState(state.currentSentenceNum, state.currentRoundNum);
  if (state.shuffledWordsArr) {
    renderSourceCards(state.shuffledWordsArr);
    renderResultRow(state.currentSentenceNum);
  }
  isAnswerAccurate(state.currentSentenceNum);
  renderTranslationHint();
};

const checkButtonClickHandler = () => {
  const resultRow = document.querySelector(`[data-sentence="${state.currentSentenceNum}"]`) as HTMLElement;
  state.resultArr[state.currentSentenceNum].forEach((el, index) => {
    if (el === state.answerArr[index]) {
      resultRow.children[index].classList.remove('incorrect');
      resultRow.children[index].classList.add('correct');
    } else {
      resultRow.children[index].classList.remove('correct');
      resultRow.children[index].classList.add('incorrect');
    }
  });
};

const autoCompleteButtonClickHandler = () => {
  const resultRow = document.querySelector(`[data-sentence="${state.currentSentenceNum}"]`) as HTMLElement;
  state.resultArr[state.currentSentenceNum].forEach((el, index) => {
    resultRow.children[index].innerHTML = state.answerArr[index];
    resultRow.children[index].classList.remove('incorrect');
    resultRow.children[index].classList.remove('correct');
    state.resultArr[state.currentSentenceNum][index] = state.answerArr[index];
  });
  isAnswerAccurate(state.currentSentenceNum);
};

const renderActions = () => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  const actionsContainer = renderElement('div', 'actions-container', mainContainer);
  const autoCompleteButton = renderElement('button', 'primary-button auto-complete-button', actionsContainer, {
    innerText: 'Auto-Complete',
  }) as HTMLButtonElement;
  autoCompleteButton.addEventListener('click', () => autoCompleteButtonClickHandler());

  const checkButton = renderElement('button', 'primary-button check-button', actionsContainer, {
    innerText: 'Check',
  }) as HTMLButtonElement;
  checkButton.disabled = true;
  checkButton.addEventListener('click', () => checkButtonClickHandler());

  const continueButton = renderElement('button', 'primary-button continue-button', actionsContainer, {
    innerText: 'Continue',
  }) as HTMLButtonElement;
  continueButton.disabled = true;
  continueButton.style.display = 'none';
  continueButton.addEventListener('click', () => continueButtonClickHandler());
};

export const renderGamePage = async () => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  mainContainer.innerHTML = '';
  const mainHeader = renderElement('div', 'main-header', mainContainer);
  const logoutButton = renderElement('button', 'primary-button logout-button', mainHeader, {
    type: 'button',
    innerText: 'Logout',
  });
  logoutButton.addEventListener('click', () => logout());

  const gameContainer = renderElement('div', 'game-container', mainContainer);
  renderElement('div', 'translation-container', gameContainer);
  renderElement('div', 'source-container', gameContainer);
  await manageGameState('1', 0, 0);
  if (state.shuffledWordsArr) {
    renderSourceCards(state.shuffledWordsArr);
  }
  renderResultField(0);
  renderTranslationHint();
  renderActions();
};
