/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
import { onNavigate } from '../router/navigate';
import { signInWithGoogle } from '../lib/Autenticacion';

export const Register = () => {
  const containerRegister = document.createElement('div');
  containerRegister.className = 'containerRegister';

  const backgroundRegister = document.createElement('div');
  backgroundRegister.className = 'backgroundRegister';

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

  const buttonGoogle = document.createElement('button');
  buttonGoogle.textContent = 'GOOGLE';
  buttonGoogle.className = 'buttonGoogle';

  // const buttonHome = document.createElement('button');// revis

  buttonSign.textContent = 'Sign Up';
  // buttonHome.textContent = 'Login Here'; // revisar

  formRegister.appendChild(homeDiv);
  containerRegister.appendChild(backgroundRegister);
  containerRegister.appendChild(emailRegister);
  containerRegister.appendChild(nameRegister);
  containerRegister.appendChild(passwordRegister);
  containerRegister.appendChild(confirmPassword);
  // containerRegister.appendChild(frase);
  containerRegister.appendChild(or);
  homeDiv.appendChild(buttonSign);
  homeDiv.appendChild(frase);
  containerRegister.appendChild(homeDiv);
  homeDiv.appendChild(buttonGoogle);

  buttonSign.addEventListener('click', () => onNavigate('/'));
  // buttonSign.addEventListener('click', () => registerWithEmail); // entrar al perfil
  frase.addEventListener('click', () => onNavigate('/login'));
  buttonGoogle.addEventListener('click', () => signInWithGoogle());

  return containerRegister;
};
