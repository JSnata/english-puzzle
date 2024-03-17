export interface State {
  levelData: null | GameData;
  roundSentences: null | Word[];
  currentTranslation: string;
  currentAudio: string;
  currentRoundNum: number;
  currentSentenceNum: number;
  currentLevel: string;
  roundsCounter: number;
  maxLevel: string;
  shuffledWordsArr: null | string[];
  resultArr: string[][];
  sourceArr: string[][];
  answerArr: string[];
  isHintTranslation: boolean;
  isHintAudio: boolean;
  knownSentences: number[];
  unknownSentences: number[];
}

export interface Word {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface Round {
  levelData: LevelData;
  words: Word[];
}

export interface GameData {
  rounds: Round[];
}
