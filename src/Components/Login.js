/* eslint-disable import/no-cycle */
import { onNavigate } from '../router/navigate';

export const Login = () => {
  const containerLogin = document.createElement('div'); // creación de container para sostener nuestra página
  containerLogin.className = 'containerLogin';
  // const image = document.createElement('img');
  // image.className = 'img';//

  // const formLogin = document.createElement('form');
  // formLogin.className = 'formLogin';

  const homeDiv = document.createElement('h1');
  homeDiv.textContent = 'WELCOME';
  homeDiv.className = 'homeDivLogin';

  const homeDivH2 = document.createElement('h2');
  homeDivH2.textContent = 'Login to Coffee Hour';
  homeDivH2.className = 'homeDivH2';

  // const homeLogin = document.createElement('div');
  // homeLogin.textContent = 'Login to Coffee Hour';
 /* homeDiv.innerHTML = 'Login to Coffee Hour <input id = "correo">';
  const myInput = homeDiv.querySelector('#correo');
  console.log(myInput); */
  const formLogin = document.createElement('form');
  formLogin.className = 'formLogin';
  formLogin.id = 'formLogin';

  const emailInput = document.createElement('input');
  emailInput.id = 'correo';
  emailInput.type = 'email';
  emailInput.placeholder = 'Email Address';

  const emailPassword = document.createElement('input');
  emailPassword.id = 'clave';
  emailPassword.type = 'password';
  emailPassword.placeholder = 'Enter your password';

  const forgotP = document.createElement('h4');
  forgotP.textContent = 'Forgot password?';
  forgotP.className = 'forgotP';

  const buttonContinue = document.createElement('button');
  buttonContinue.textContent = 'Continue';
  buttonContinue.className = 'buttonContinue';

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Do not have an account? Sign Up';
  buttonHome.className = 'buttonHome';

  formLogin.appendChild(homeDiv);
  containerLogin.appendChild(homeDiv);
  containerLogin.appendChild(homeDivH2);
  containerLogin.appendChild(emailInput);
  containerLogin.appendChild(emailPassword);
  containerLogin.appendChild(forgotP);
  homeDiv.appendChild(buttonContinue);
  homeDiv.appendChild(buttonHome);

  buttonContinue.addEventListener('click', () => onNavigate('/'));
  buttonHome.addEventListener('click', () => onNavigate('/register'));

  return containerLogin;
};
