import { renderResultsPage } from './../resultsPage';
import { shuffleArray } from '../../utils/arrayUtils';
import { logout, setHintState, saveGameProgress } from '../../utils/localStorageUtils';
import { getWordCards, isAnswerAccurate, renderSourceCards } from './wordCards';
import { renderResultField, renderResultRow } from './resultField';
import { renderElement } from '../renderElement';
import { state } from '../app/app';
import { renderStartGameMenu } from '../gameMenu';

const baseUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/';

export const manageWordsState = (level: string, sentence: number, round: number) => {
  if (state.levelData) {
    const test = round >= state.levelData.rounds.length ? state.levelData.rounds.length - 1 : round;
    state.roundSentences = state.levelData.rounds[test].words;
    state.resultArr.push([]);
    state.currentTranslation = state.roundSentences[sentence].textExampleTranslate;
    state.currentAudio = state.roundSentences[sentence].audioExample;
    state.currentSentenceNum = sentence;
    state.currentRoundNum = round;
    state.currentLevel = level;
    state.roundsCounter = state.levelData.rounds.length;
    const currentSentence = state.roundSentences[sentence];
    const wordsArr = currentSentence.textExample.split(' ');
    const shuffledWordsArr: string[] = shuffleArray(wordsArr);
    state.answerArr = wordsArr;
    state.shuffledWordsArr = shuffledWordsArr;
    state.sourceArr.push(shuffledWordsArr);

    if (round >= state.levelData.rounds.length) {
      state.currentLevel = (+level + 1).toString();
      state.currentRoundNum = 0;

      if (+state.currentLevel > +state.maxLevel) {
        state.currentLevel = '1';
        state.currentRoundNum = 0;
      }
    }
  }
};

export const manageGameState = async (level: string, sentence: number, round: number) => {
  const data = await getWordCards(level);
  if (data) {
    state.levelData = data;
    manageWordsState(level, sentence, round);
  }
};

export const showHintContent = (type: 'text' | 'audio', flag: boolean) => {
  let typeState: boolean;
  let typeSelector: string;

  switch (type) {
    case 'audio':
      typeState = state.isHintAudio;
      typeSelector = 'audio-hint-button';
      break;
    case 'text':
    default:
      typeState = state.isHintTranslation;
      typeSelector = 'translation-hint-text';
      break;
  }

  if (typeState && !flag) {
    return;
  }

  const node = document.querySelector(`.game-container .${typeSelector}`) as HTMLElement;
  node.classList.toggle('hidden', !flag);
};

export const renderHints = () => {
  const gameContainer = document.querySelector('.game-container') as HTMLElement;
  const header = document.querySelector('.main-header') as HTMLElement;
  const hintsContainer = renderElement('div', 'hints-content-block', gameContainer);
  const hintsActionsContainer = renderElement('div', 'hint-actions-container', header);
  const textHintWrapper = renderElement('div', 'text-hint-wrapper', hintsActionsContainer);
  const audioHintWrapper = renderElement('div', 'audio-hint-wrapper', hintsActionsContainer);

  const textHint = renderElement(
    'p',
    `translation-hint-text ${state.isHintTranslation ? '' : 'hidden'}`,
    hintsContainer,
    {
      innerText: state.currentTranslation,
    }
  );
  const textHintIcon = renderElement(
    'span',
    `translation-icon ${state.isHintTranslation ? '' : 'disabled'}`,
    textHintWrapper,
    {
      innerText: '?',
    }
  ) as HTMLButtonElement;
  const audioHint = renderElement(
    'button',
    `primary-button audio-hint-button ${state.isHintAudio ? '' : 'hidden'}`,
    hintsContainer
  );
  const audioElement = renderElement('audio', '', audioHintWrapper, {
    id: 'audioPlayer',
  });
  const audioElementSource = renderElement('source', '', audioElement, {
    type: 'audio/mp3',
  }) as HTMLSourceElement;
  audioElementSource.src = baseUrl + state.currentAudio;

  const audioHintIcon = renderElement('span', `audio-icon ${state.isHintAudio ? '' : 'disabled'}`, audioHintWrapper, {
    innerText: 'Audio',
  }) as HTMLButtonElement;

  showHintContent('text', false);
  showHintContent('audio', false);

  audioHint.addEventListener('click', () => {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;

    audioPlayer.play().then(() => {
      audioHint.classList.add('-active');
    });

    audioPlayer.onended = () => {
      audioHint.classList.remove('-active');
    };
  });

  textHintIcon.addEventListener('click', () => {
    textHintIcon.classList.toggle('disabled', state.isHintTranslation);
    textHint.classList.toggle('hidden', state.isHintTranslation);
    state.isHintTranslation = !state.isHintTranslation;
    setHintState('text');
  });

  audioHintIcon.addEventListener('click', () => {
    audioHintIcon.classList.toggle('disabled', state.isHintAudio);
    audioHint.classList.toggle('hidden', state.isHintAudio);
    state.isHintAudio = !state.isHintAudio;
    setHintState('audio');
  });
};

export const setTextHintContent = () => {
  const textElement = document.querySelector('.game-container .translation-hint-text') as HTMLElement;

  textElement.innerText = state.currentTranslation;
};

export const setAudioHintContent = () => {
  const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
  const sourceElement = document.querySelector('#audioPlayer source') as HTMLSourceElement;
  sourceElement.src = baseUrl + state.currentAudio;
  audioPlayer.load();
};

const continueButtonClickHandler = () => {
  const checkButton = document.querySelector('.check-button') as HTMLButtonElement;
  // const resultsButton = document.querySelector('.results-button') as HTMLButtonElement;
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
    saveGameProgress();
  }

  manageWordsState(state.currentLevel, state.currentSentenceNum, state.currentRoundNum);
  if (state.shuffledWordsArr) {
    renderSourceCards(state.shuffledWordsArr);
    renderResultRow(state.currentSentenceNum);
  }
  isAnswerAccurate(state.currentSentenceNum);
  showHintContent('text', false);
  showHintContent('audio', false);
  setTextHintContent();
  setAudioHintContent();
  renderStartGameMenu();
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
  const sourceBlockItems = document.querySelectorAll('.source-container > .word-card') as NodeListOf<HTMLElement>;

  state.resultArr[state.currentSentenceNum].forEach((el, index) => {
    resultRow.children[index].innerHTML = state.answerArr[index];
    resultRow.children[index].classList.remove('incorrect');
    resultRow.children[index].classList.remove('correct');
    state.resultArr[state.currentSentenceNum][index] = state.answerArr[index];
  });

  sourceBlockItems.forEach((item) => {
    if (item) {
      item.innerHTML = '';
    }
  });

  state.unknownSentences.push(state.currentSentenceNum);
  isAnswerAccurate(state.currentSentenceNum);
  showHintContent('text', true);
  showHintContent('audio', true);
};

const resultsButtonClickHandler = () => {
  renderResultsPage();
};

const renderActions = () => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  mainContainer.classList.add('-game');
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

  const resultsButton = renderElement('button', 'primary-button results-button', actionsContainer, {
    innerText: 'Results',
  }) as HTMLButtonElement;
  resultsButton.disabled = true;
  resultsButton.style.display = 'none';
  resultsButton.addEventListener('click', () => resultsButtonClickHandler());
};

export const renderGamePage = async (level = '1', sentence = 0, round = 0) => {
  const body = document.querySelector('body') as HTMLElement;
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  const header = document.querySelector('.main-header') as HTMLElement;

  if (header) {
    header.remove();
  }

  mainContainer.innerHTML = '';
  const mainHeader = renderElement('div', 'main-header', body);
  const logoutButton = renderElement('button', 'secondary-button logout-button', mainHeader, {
    type: 'button',
    innerText: 'Logout',
  });
  logoutButton.addEventListener('click', () => logout());

  const gameContainer = renderElement('div', 'game-container', mainContainer);

  renderElement('div', 'source-container', gameContainer);
  await manageGameState(level, sentence, round);

  if (state.shuffledWordsArr) {
    renderSourceCards(state.shuffledWordsArr);
  }
  renderResultField(sentence);
  renderHints();
  renderStartGameMenu();
  renderActions();
};
