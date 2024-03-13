import { initialRender } from '../initialRender';
import { State } from '../../types/interfaces';

export const state: State = {
  levelData: null,
  shuffledWordsArr: null,
  resultArr: [],
  sourceArr: [],
};

const App = () => {
  initialRender();
};

export default App;
