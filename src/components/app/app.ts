import { initialRender } from '../initialRender';
import { State } from '../../types/interfaces';

export const state: State = {
  levelData: null,
  roundSentences: null,
  currentSentenceNum: 0,
  currentRoundNum: 0,
  shuffledWordsArr: null,
  resultArr: [],
  sourceArr: [],
  answerArr: [],
};

const App = () => {
  initialRender();
};

export default App;
