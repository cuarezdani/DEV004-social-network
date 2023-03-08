import { onNavigate } from '../router/navigate';

export const Home = () => {
  const container = document.createElement('div');
  container.className = 'container';

  const homeDiv = document.createElement('div');
  homeDiv.textContent = 'Welcome To Coffee Hour';
  homeDiv.className = 'homeDiv';

  const buttonLogin = document.createElement('button');
  buttonLogin.className = 'buttonLogin';
  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'buttonRegister';

  buttonLogin.textContent = 'Login';
  buttonRegister.textContent = 'Sign up';

  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonLogin.addEventListener('click', () => onNavigate('/login'));

  homeDiv.appendChild(buttonLogin);
  homeDiv.appendChild(buttonRegister);
  container.appendChild(homeDiv);

  return container;
};
