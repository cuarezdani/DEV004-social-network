import { onNavigate } from '../router/navigate';

export const Register = () => {
  const homeDiv = document.createElement('div');
  homeDiv.textContent = 'Create your account';
  const buttonSign = document.createElement('button');
  const buttonHome = document.createElement('button');

  buttonSign.textContent = 'Sign Up';
  buttonHome.textContent = 'Login Here';

  buttonSign.addEventListener('click', () => onNavigate('/'));
  buttonHome.addEventListener('click', () => onNavigate('/login'));

  homeDiv.appendChild(buttonSign);
  homeDiv.appendChild(buttonHome);

  return homeDiv;
};
