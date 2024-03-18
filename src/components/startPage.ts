import { state } from './app/app';
import { renderElement } from './renderElement';
import { renderGamePage } from './gamePage/gamePage';
import { logout, getGameProgress } from '../utils/localStorageUtils';

const renderProgressMessage = () => {
  const header = document.querySelector('.main-header') as HTMLElement;
  const node = renderElement('div', 'progress-message', header, {
    innerText: `The came is continue at ${state.currentLevel} level and ${state.currentRoundNum} round`,
  });

  setTimeout(() => {
    node.remove();
  }, 5000);
};

const startGameHandler = () => {
  const currentRoundNum = getGameProgress('currentRoundNum') ?? state.currentRoundNum;
  const currentLevel = getGameProgress('currentLevel') ?? state.currentLevel;

  renderGamePage(currentLevel, 0, Number(currentRoundNum));

  if (getGameProgress('currentLevel')) {
    renderProgressMessage();
  }
};

export const renderStartPage = (userCredentials: { firstName: string; surname: string }) => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  const pageWrapper = renderElement('div', 'page-wrapper', mainContainer);
  const mainContent = renderElement('div', 'main-content', pageWrapper);

  const mainHeader = renderElement('div', 'header', mainContent);
  renderElement('h1', 'main-heading', mainHeader, {
    innerText: 'ENGLISH PUZZLE',
  });
  const descriptionContainer = renderElement('div', 'game-description', mainHeader);

  renderElement('p', '', descriptionContainer, {
    innerText: 'Build sentences, improve your English skills, track progress and have fun!',
  });

  const greetingContainer = renderElement('div', 'greeting-container', mainContent);
  if (userCredentials) {
    renderElement('p', 'greeting-message show', greetingContainer, {
      innerText: `Hey, ${userCredentials.firstName} ${userCredentials.surname}! Ready for learning?`,
    });
  }
  renderElement('div', '', mainContent);

  const actionsWrapper = renderElement('div', 'actions-wrapper', greetingContainer);

  const startGameButton = renderElement('button', 'secondary-button -xl', actionsWrapper, {
    innerText: 'Start',
    type: 'button',
  });
  startGameButton?.addEventListener('click', () => startGameHandler());
  const logoutButton = renderElement('button', 'primary-button -xl logout-button', actionsWrapper, {
    type: 'button',
    innerText: 'Logout',
  });
  logoutButton.addEventListener('click', () => logout());
};
