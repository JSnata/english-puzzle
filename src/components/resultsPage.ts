import { saveGameProgress } from '../utils/localStorageUtils';
import { state } from './app/app';
import { renderGamePage } from './gamePage/gamePage';
import { renderElement } from './renderElement';

const baseUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/';
const baseImageUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/';

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

const resultAudioClickHandler = (e: Event) => {
  const button = e.target as HTMLButtonElement;
  const sentence = button.dataset.audioTarget;
  const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
  const audioPlayerSource = document.getElementById('audioPlayerSource') as HTMLAudioElement;
  if (sentence) {
    audioPlayerSource.src = baseUrl + state.levelData?.rounds[state.currentRoundNum].words[+sentence].audioExample;
    console.log(audioPlayerSource.src);
    audioPlayer.load();
    audioPlayer.play();
  }
};

interface Options {
  data: number[];
  title: string;
  class: string;
}

const renderWords = (options: Options) => {
  const resultContainer = document.querySelector('.result-container') as HTMLElement;

  if (options.data.length) {
    const wrapper = renderElement('div', `results-list-wrapper ${options.class}`, resultContainer);
    renderElement('h2', 'heading-secondary', wrapper, {
      innerText: options.title,
    });
    const list = renderElement('ul', 'sentences-list', wrapper);
    options.data.forEach((sentence) => {
      const text = state.levelData?.rounds[state.currentRoundNum].words[sentence].textExample;
      if (text) {
        const item = renderElement('li', 'item', list);
        const audioButton = renderElement('button', 'primary-button audio-hint-button', item);
        audioButton.dataset.audioTarget = `${sentence}`;
        audioButton.addEventListener('click', (e) => resultAudioClickHandler(e));
        renderElement('p', 'sentence-item', item, {
          innerText: text,
        });
      }
    });
  }
};

export const renderResultsPage = () => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  mainContainer.innerHTML = '';
  const resultContainer = renderElement('div', 'result-container', mainContainer);
  const artworkData = state.levelData?.rounds[state.currentRoundNum].levelData;
  if (artworkData) {
    const artworkContainer = renderElement('div', 'artwork-wrapper', resultContainer);
    renderElement('p', 'artwork-name', artworkContainer, {
      innerText: '' + state.levelData?.rounds[state.currentRoundNum].levelData.name,
    });
    renderElement('p', 'artwork-author', artworkContainer, {
      innerText: `${artworkData.author} (${artworkData.year})`,
    });
    renderElement('img', 'artwork-img', artworkContainer, {
      src: baseImageUrl + state.levelData?.rounds[state.currentRoundNum].levelData.cutSrc,
    });
  }
  const audioElement = renderElement('audio', '', mainContainer, {
    id: 'audioPlayer',
  });
  const audioElementSource = renderElement('source', '', audioElement, {
    type: 'audio/mp3',
    id: 'audioPlayerSource',
  }) as HTMLSourceElement;
  audioElementSource.src = baseUrl;

  renderWords({ data: state.knownSentences, title: 'I know', class: '-known' });
  renderWords({ data: state.unknownSentences, title: "I don't know", class: '-unknown' });

  const continueGameButton = renderElement('button', 'primary-button continue-game-button', resultContainer, {
    innerText: 'Continue game',
  }) as HTMLButtonElement;
  continueGameButton.addEventListener('click', () => continueGameButtonClickHandler());
};
