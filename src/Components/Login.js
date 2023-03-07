import { onNavigate } from '../router/navigate';

export const Login = () => {
  const homeDiv = document.createElement('div');
  homeDiv.textContent = 'Log in to Coffee Hour';

  const buttonContinue = document.createElement('button');
  buttonContinue.textContent = 'Continue';

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Sign Up';

  buttonContinue.addEventListener('click', () => onNavigate('/'));
  buttonHome.addEventListener('click', () => onNavigate('/register'));

  homeDiv.appendChild(buttonContinue);
  homeDiv.appendChild(buttonHome);

  return homeDiv;
};
