export interface State {
  levelData: null | GameData;
  roundSentences: null | Word[];
  currentRoundNum: number;
  currentSentenceNum: number;
  shuffledWordsArr: null | string[];
  resultArr: string[][];
  sourceArr: string[][];
  answerArr: string[];
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
