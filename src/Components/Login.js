/* eslint-disable import/no-cycle */
import { onNavigate } from '../router/navigate';

export const Login = () => {
  const containerLogin = document.createElement('div'); // creación de container para sostener nuestra página
  containerLogin.className = 'containerLogin';
  const backgroundLogin = document.createElement('div');
  backgroundLogin.className = 'backgroundLogin';
  const homeDiv = document.createElement('h1');
  homeDiv.textContent = 'WELCOME';
  homeDiv.className = 'homeDivLogin';

  const homeDivH2 = document.createElement('h2');
  homeDivH2.textContent = 'Login to Coffee Hour';
  homeDivH2.className = 'homeDivH2';

  // const homeLogin = document.createElement('div');
  // homeLogin.textContent = 'Login to Coffee Hour';
  // homeDiv.innerHTML = 'Login to Coffee Hour <input id = "correo">';
  /*  const myInput = homeDiv.querySelector('#correo');
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

  const forgotP = document.createElement('h4'); // debe redirigirte a un formulario para hacer tu clave
  forgotP.textContent = 'Forgot your password?';
  forgotP.className = 'forgotP';

  const buttonContinue = document.createElement('button');
  buttonContinue.textContent = 'Continue';
  buttonContinue.className = 'buttonContinue';

  // const dontAccount = document.createElement('h5');
  // dontAccount.textContent = 'Don`t have an account?';
  // dontAccount.className = 'dontAccount';

  const buttonSign = document.createElement('h6'); // boton que dirige a register
  buttonSign.textContent = 'Don’t have an account? Sign Up';
  buttonSign.className = 'buttonSign';

  const lineaOr = document.createElement('h5'); // linea y or
  lineaOr.textContent = 'or';
  lineaOr.className = 'lineaOr';

  formLogin.appendChild(homeDiv);
  containerLogin.appendChild(backgroundLogin);
  containerLogin.appendChild(homeDiv);
  containerLogin.appendChild(homeDivH2);
  containerLogin.appendChild(emailInput);
  containerLogin.appendChild(emailPassword);
  containerLogin.appendChild(forgotP);
  containerLogin.appendChild(buttonContinue);
  // containerLogin.appendChild(dontAccount);
  containerLogin.appendChild(buttonSign);
  containerLogin.appendChild(lineaOr);

  buttonContinue.addEventListener('click', () => onNavigate('/'));
  buttonSign.addEventListener('click', () => onNavigate('/register'));

  return containerLogin;
};
