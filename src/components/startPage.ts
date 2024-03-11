import { renderElement } from './renderElement';

export const renderStartPage = () => {
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  const pageWrapper = renderElement('div', 'page-wrapper', mainContainer);
  renderElement('h1', 'main-heading', pageWrapper, {
    innerText: 'RSS PUZZLE',
  });
  const descriptionContainer = renderElement('div', 'game-description', pageWrapper, {});

  renderElement('p', '', descriptionContainer, {
    innerText: 'Build sentences, improve your English skills, track progress and have fun!',
  });
};
