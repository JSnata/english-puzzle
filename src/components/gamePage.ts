export const renderGamePage = () => {
  console.log('hey');
  const mainContainer = document.querySelector('.main-container') as HTMLElement;

  mainContainer.innerHTML = '';
  mainContainer.innerText = 'Game Page';
};
