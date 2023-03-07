import { onNavigate } from '../router/navigate';

export const Home = () => {
  const homeDiv = document.createElement('div');
  homeDiv.textContent = 'Welcome To Coffee Hour';
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  buttonLogin.textContent = 'Login';
  buttonRegister.textContent = 'Sign up';

  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonLogin.addEventListener('click', () => onNavigate('/login'));

  homeDiv.appendChild(buttonLogin);
  homeDiv.appendChild(buttonRegister);

  return homeDiv;
};
