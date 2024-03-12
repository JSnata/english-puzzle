import { renderElement } from './renderElement';
import { renderGamePage } from './gamePage/gamePage';
import { logout } from '../utils/localStorageUtils';

const startGameHandler = () => {
  renderGamePage();
};

export const renderStartPage = (userCredentials: { firstName: string; surname: string }) => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  const pageWrapper = renderElement('div', 'page-wrapper', mainContainer);
  const mainContent = renderElement('div', 'main-content', pageWrapper);

  const mainHeader = renderElement('div', 'header', mainContent);
  renderElement('h1', 'main-heading', mainHeader, {
    innerText: 'RSS PUZZLE',
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
  const startGameButton = renderElement('button', 'primary-button', greetingContainer, {
    innerText: 'Start',
    type: 'button',
  });
  startGameButton?.addEventListener('click', () => startGameHandler());
  const logoutButton = renderElement('button', 'primary-button logout-button', greetingContainer, {
    type: 'button',
    innerText: 'Logout',
  });
  logoutButton.addEventListener('click', () => logout());
};
