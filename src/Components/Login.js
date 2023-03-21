/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import { onNavigate } from '../router';
import { signInWithGoogle, signInWithPassword } from '../lib/Autenticacion';

export const Login = () => {
  const containerLogin = document.createElement('div'); // creación de container para sostener nuestra página
  containerLogin.className = 'containerLogin';

  const logoCaffee = document.createElement('img');
  logoCaffee.src = '../imagenes/logo1.png';
  logoCaffee.className = 'logoCaffee';

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
  const formLogin = document.createElement('section');
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
  buttonContinue.id = 'buttonContinue';

  const buttonSign = document.createElement('h6'); // boton que dirige a register
  buttonSign.textContent = 'Don’t have an account? Sign Up';
  buttonSign.className = 'buttonSign';

  const lineaOr = document.createElement('h5'); // linea y or
  lineaOr.textContent = 'or';
  lineaOr.className = 'lineaOr';

  const imgGoogle = document.createElement('img');
  imgGoogle.className = 'imgGoogle';
  imgGoogle.src = '../imagenes/iconogoogle.svg';
  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'buttonGoogle';
  const strong = document.createElement('strong');
  strong.textContent = 'Sign up with Google';
  strong.className = 'textGoogle';

  formLogin.appendChild(homeDiv);
  containerLogin.appendChild(logoCaffee);
  containerLogin.appendChild(homeDiv);
  containerLogin.appendChild(homeDivH2);
  containerLogin.appendChild(emailInput);
  containerLogin.appendChild(emailPassword);
  containerLogin.appendChild(forgotP);
  containerLogin.appendChild(buttonContinue);
  containerLogin.appendChild(buttonSign);
  containerLogin.appendChild(lineaOr);
  containerLogin.appendChild(buttonGoogle);
  buttonGoogle.append(imgGoogle, strong);

  buttonContinue.addEventListener('click', () => signInWithPassword);
  buttonContinue.addEventListener('click', () => {
    const emailValue = emailInput.value;
    const passwordValue = emailPassword.value;

    const user = {
      email: emailValue,
      emailPassword: passwordValue,
    };

    signInWithPassword(user.email, user.emailPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        // alert('Register Accepted');
        window.location.href = '/'; // pendiente redirigir al perfil
        // Redirigir al usuario a la página de perfil o a la página de inicio de sesión
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Mostrar un mensaje de error al usuario
        // alert('Invalid email or password.');
        window.location.href = '/login'; // si nos marca error nos manda al home
      });
  });

  buttonSign.addEventListener('click', () => onNavigate('/register'));
  buttonGoogle.addEventListener('click', () => signInWithGoogle());

  return containerLogin;
};
