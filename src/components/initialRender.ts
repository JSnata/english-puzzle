import { renderElement } from './renderElement';

export const initialRender = () => {
  document.body.innerHTML = '';
  renderElement('div', 'main-container', document.body, {
    id: 'mainContainer',
  });
};
