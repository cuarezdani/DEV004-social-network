/* eslint-disable import/no-cycle */
import { onNavigate } from '../router/navigate';

export const Register = () => {
  const containerRegister = document.createElement('div');
  containerRegister.className = 'containerRegister';

  const homeDiv = document.createElement('h1');
  homeDiv.textContent = 'Create your account';
  homeDiv.className = 'homeDivRegister';

  const formRegister = document.createElement('form');
  formRegister.className = 'formRegister';
  formRegister.id = 'formRegister';

  const emailRegister = document.createElement('input');
  emailRegister.id = 'correoRegister';
  emailRegister.type = 'email';
  emailRegister.placeholder = 'Email Address';

  const nameRegister = document.createElement('input');
  nameRegister.id = 'nombre';
  nameRegister.type = 'Name';
  nameRegister.placeholder = 'Name';

  const passwordRegister = document.createElement('input');
  passwordRegister.id = 'claveRegister';
  passwordRegister.type = 'password';
  passwordRegister.placeholder = 'Enter your password';

  const confirmPassword = document.createElement('input'); // debe redirigirte a un formulario para hacer tu clave
  confirmPassword.id = 'confirmPassword';
  confirmPassword.type = 'password';
  confirmPassword.placeholder = 'Confirm your password';

  const buttonSign = document.createElement('button');
  buttonSign.textContent = 'SIGN UP';
  buttonSign.className = 'buttonSignUp';

  const frase = document.createElement('h6'); // boton que dirige a register
  frase.textContent = 'Already have an account? Login here ';
  frase.className = 'frase';

  const or = document.createElement('h5'); // linea y or
  or.textContent = 'or';
  or.className = 'or';

  // const buttonHome = document.createElement('button');// revis

  buttonSign.textContent = 'Sign Up';
  // buttonHome.textContent = 'Login Here'; // revisar

  formRegister.appendChild(homeDiv);
  containerRegister.appendChild(emailRegister);
  containerRegister.appendChild(nameRegister);
  containerRegister.appendChild(passwordRegister);
  containerRegister.appendChild(confirmPassword);
  // containerRegister.appendChild(frase);
  containerRegister.appendChild(or);
  homeDiv.appendChild(buttonSign);
  homeDiv.appendChild(frase);
  containerRegister.appendChild(homeDiv);

  buttonSign.addEventListener('click', () => onNavigate('/')); // entrar al perfil
  frase.addEventListener('click', () => onNavigate('/login'));

  return containerRegister;
};
