import { initialRender } from '../initialRender';
import { State } from '../../types/interfaces';
import { getHintState } from '../../utils/localStorageUtils';

export const state: State = {
  sentencesInField: 9,
  baseImageUrl: 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/',
  baseUrl: 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/',
  levelData: null,
  roundSentences: null,
  currentTranslation: '',
  currentAudio: '',
  currentSentenceNum: 0,
  currentRoundNum: 0,
  currentLevel: '1',
  maxLevel: '6',
  roundsCounter: 0,
  shuffledWordsArr: null,
  resultArr: [],
  sourceArr: [],
  answerArr: [],
  isHintTranslation: getHintState('text'),
  isHintAudio: getHintState('audio'),
  knownSentences: [],
  unknownSentences: [],
};

const App = () => {
  initialRender();
};

export default App;
