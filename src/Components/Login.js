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

  const errorMessageL = document.createElement('h4');
  errorMessageL.className = 'errorMessage';
  errorMessageL.id = 'errorMessage';
  errorMessageL.style.display = 'none';

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
  buttonContinue.id = 'buttonContinue';

  const buttonSign = document.createElement('h6'); // boton que dirige a register
  buttonSign.textContent = 'Don’t have an account? Sign Up';
  buttonSign.className = 'buttonSign';

  const lineaOr = document.createElement('div');
  lineaOr.className = 'lineaOr';
  const linea = document.createElement('hr'); // linea y or
  linea.className = 'linea';
  const or = document.createElement('strong'); // linea y or
  or.textContent = 'or';
  or.className = 'or';
  const linea1 = document.createElement('hr'); // linea y or
  linea1.className = 'linea1';

  const imgGoogle = document.createElement('img');
  imgGoogle.className = 'imgGoogle';
  imgGoogle.src = '../imagenes/iconogoogle.svg';
  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'buttonGoogle';
  const strong = document.createElement('strong');
  strong.textContent = 'Sign up with Google';
  strong.className = 'textGoogle';

  formLogin.appendChild(containerLogin);
  containerLogin.appendChild(logoCaffee);
  containerLogin.appendChild(homeDiv);
  containerLogin.appendChild(homeDivH2);
  containerLogin.appendChild(errorMessageL);
  containerLogin.appendChild(emailInput);
  containerLogin.appendChild(emailPassword);
  containerLogin.appendChild(forgotP);
  containerLogin.appendChild(buttonContinue);
  containerLogin.appendChild(buttonSign);
  containerLogin.appendChild(lineaOr);
  lineaOr.append(linea, or, linea1);
  containerLogin.appendChild(buttonGoogle);
  buttonGoogle.append(imgGoogle, strong);

  // buttonContinue.addEventListener('click', () => signInWithPassword);
  buttonContinue.addEventListener('click', () => {
    const emailValue = emailInput.value;
    const passwordValue = emailPassword.value;

    // si el value es extrictamentee vacio nos da verdadero el mensaje
    if (emailValue === '' || passwordValue === '') {
      errorMessageL.textContent = 'Fields cannot be empty';
    } else {
      const user = {
        email: emailValue,
        emailPassword: passwordValue,
      };

      signInWithPassword(user.email, user.emailPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          // alert('Register Accepted');
          window.location.href = '/feed'; // pendiente redirigir al perfil
          // Redirigir al usuario a la página de perfil o a la página de inicio de sesión
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode === 'auth/network-request-failed.') {
            errorMessageL.style.display = 'block';
            errorMessageL.textContent = 'Fields cannot be empty.';
          } else if (errorCode === 'auth/invalid-email') {
            console.log(errorMessageL);
            errorMessageL.style.display = 'block';
            errorMessageL.textContent = 'Invalid email.';
          } else if (
            errorCode === 'auth/invalid-password'
            || errorCode === 'auth/wrong-password'
          ) {
            errorMessageL.textContent = '';
            errorMessageL.style.display = 'block';
            errorMessageL.textContent = 'Invalid password.';
          } else if (
            errorCode === 'auth/user-not-found'
          ) {
            errorMessageL.textContent = '';
            errorMessageL.style.display = 'block';
            errorMessageL.textContent = 'User not found.';
          }

          return error;

          // const errorMessage = error.message;
          // Mostrar un mensaje de error al usuario
          // alert('Invalid email or password.');
          // window.location.href = '/login'; //
        });
    }
  });

  buttonSign.addEventListener('click', () => onNavigate('/register'));
  buttonGoogle.addEventListener('click', () => signInWithGoogle());

  return containerLogin;
};
