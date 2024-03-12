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
