// import { GameData } from './../types/interfaces';
import { state } from './app/app';
import { renderGamePage } from './gamePage/gamePage';
import { renderElement } from './renderElement';

export const renderStartGameMenu = () => {
  const mainContainer = document.querySelector('.hint-actions-container') as HTMLElement;
  const levels = 6;
  const rounds = state.roundsCounter;

  const gameMenuContainer = renderElement('div', 'game-menu', mainContainer, {
    id: 'gameMenuContainer',
  });
  const gameForm = renderElement('form', 'game-menu-form', gameMenuContainer, {
    id: 'gameForm',
  });

  const elementWrap1 = renderElement('div', 'item', gameForm);
  const elementWrap2 = renderElement('div', 'item', gameForm);

  const levelLabel = renderElement('label', 'game-menu-label', elementWrap1, {
    for: 'levelSelect',
  });

  levelLabel.innerText = 'Level';
  const levelSelect = renderElement('select', 'game-menu-select', elementWrap1, {
    id: 'levelSelect',
    name: 'level',
  }) as HTMLSelectElement;

  //render Level options

  for (let i = 1; i <= levels; i++) {
    const option = renderElement('option', 'game-menu-option', levelSelect, {
      value: i.toString(),
      innerText: i.toString(),
    }) as HTMLOptionElement;
    if (Number(state.currentLevel) === i) {
      option.selected = true;
    }
  }
  const roundLabel = renderElement('label', 'game-menu-label', elementWrap2, {
    for: 'roundSelect',
  });

  roundLabel.innerText = 'Round';
  const roundSelect = renderElement('select', 'game-menu-select', elementWrap2, {
    id: 'roundSelect',
    name: 'round',
  }) as HTMLSelectElement;

  for (let i = 1; i <= rounds; i++) {
    const option = renderElement('option', 'game-menu-option', roundSelect, {
      value: i.toString(),
      innerText: i.toString(),
    }) as HTMLOptionElement;
    if (state.currentRoundNum + 1 === i) {
      option.selected = true;
    }
  }

  levelSelect.addEventListener('change', function () {
    const selectedLevel = levelSelect.value;
    state.resultArr = [];
    state.sourceArr = [];
    renderGamePage(selectedLevel, 0, 0);
  });

  roundSelect.addEventListener('change', function () {
    const selectedRound = roundSelect.value;
    state.resultArr = [];
    state.sourceArr = [];
    renderGamePage(state.currentLevel, 0, Number(selectedRound) - 1);
  });
};
