import { initialRender } from '../initialRender';
import { State } from '../../types/interfaces';
import { getHintState } from '../../utils/localStorageUtils';

export const state: State = {
  levelData: null,
  roundSentences: null,
  currentTranslation: '',
  currentAudio: '',
  currentSentenceNum: 0,
  currentRoundNum: 0,
  currentLevel: '1',
  roundsCounter: 0,
  shuffledWordsArr: null,
  resultArr: [],
  sourceArr: [],
  answerArr: [],
  isHintTranslation: getHintState('text'),
  isHintAudio: getHintState('audio'),
};

const App = () => {
  initialRender();
};

export default App;
