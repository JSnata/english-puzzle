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

export const logout = () => {
  localStorage.removeItem('firstName');
  localStorage.removeItem('surname');
  initialRender();
};
