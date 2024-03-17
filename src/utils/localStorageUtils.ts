import { state } from '../components/app/app';
import { initialRender } from '../components/initialRender';

export const getUserCredentials = () => {
  const firstName = localStorage.getItem('firstName');
  const surname = localStorage.getItem('surname');

  if (firstName && surname) {
    return {
      firstName,
      surname,
    };
  }
};

export const setHintState = (type: 'audio' | 'text') => {
  switch (type) {
    case 'audio':
      localStorage.setItem('isHintAudio', state.isHintAudio.toString());
      break;
    case 'text':
      localStorage.setItem('isHintTranslation', state.isHintTranslation.toString());
      break;
  }
};

export const getHintState = (type: 'audio' | 'text') => {
  let value;

  switch (type) {
    case 'audio':
      value = localStorage.getItem('isHintAudio');

      return value ? JSON.parse(value) : true;
    case 'text':
      value = localStorage.getItem('isHintTranslation');

      return value ? JSON.parse(value) : true;
  }
};

const clearHintsState = () => {
  localStorage.removeItem('isHintAudio');
  localStorage.removeItem('isHintTranslation');
  state.isHintTranslation = true;
  state.isHintAudio = true;
};

export const logout = () => {
  localStorage.removeItem('firstName');
  localStorage.removeItem('surname');
  clearHintsState();
  initialRender();
};

export const saveGameProgress = () => {
  localStorage.setItem('currentLevel', state.currentLevel.toString());
  localStorage.setItem('currentRoundNum', state.currentRoundNum.toString());
};

export const getGameProgress = (type: 'currentLevel' | 'currentRoundNum') => {
  return localStorage.getItem(type);
};
