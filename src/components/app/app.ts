import { initialRender } from '../initialRender';
import { State } from '../../types/interfaces';

export const state: State = {
  levelData: null,
  roundSentences: null,
  currentTranslation: '',
  currentSentenceNum: 0,
  currentRoundNum: 0,
  shuffledWordsArr: null,
  resultArr: [],
  sourceArr: [],
  answerArr: [],
  isHintTranslation: false,
};

const App = () => {
  initialRender();
};

export default App;
