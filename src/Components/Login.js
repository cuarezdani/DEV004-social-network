/* eslint-disable import/no-cycle */
import { onNavigate } from '../router/navigate';

export const Login = () => {
  const containerLogin = document.createElement('div');
  containerLogin.className = 'containerLogin';
  // const image = document.createElement('img');//
  // image.className = 'img';//

  const homeDiv = document.createElement('div');
  homeDiv.textContent = 'WELCOME';
  homeDiv.className = 'homeDivLogin';

  // const homeLogin = document.createElement('div');//
  // homeLogin.textContent = 'Login to Coffee Hour';//
  homeDiv.innerHTML = 'Login to Coffee Hour <input id = "correo">';
  const myInput = homeDiv.querySelector('#correo');
  console.log(myInput);
  const buttonContinue = document.createElement('button');
  buttonContinue.textContent = 'Continue';

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Sign Up';

  buttonContinue.addEventListener('click', () => onNavigate('/'));
  buttonHome.addEventListener('click', () => onNavigate('/register'));

  containerLogin.appendChild(homeDiv);
  homeDiv.appendChild(buttonContinue);
  homeDiv.appendChild(buttonHome);

  return containerLogin;
};
