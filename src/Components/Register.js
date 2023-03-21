/* eslint-disable no-unused-vars */
import { onNavigate } from '../router';
import { signInWithGoogle, registerWithEmail } from '../lib/Autenticacion';

export const Register = () => {
  const containerRegister = document.createElement('div');
  containerRegister.className = 'containerRegister';

  // const backgroundRegister = document.createElement('div');
  // backgroundRegister.className = 'backgroundRegister';

  const logoCaffee = document.createElement('img');
  logoCaffee.src = '../imagenes/logo1.png';
  logoCaffee.className = 'logoCaffee';

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
  nameRegister.placeholder = 'Full Name';

  const passwordRegister = document.createElement('input');
  passwordRegister.id = 'claveRegister';
  passwordRegister.type = 'password';
  passwordRegister.placeholder = 'Enter your password, at least 6 digits';

  const confirmPassword = document.createElement('input'); // debe redirigirte a un formulario para hacer tu clave
  confirmPassword.id = 'confirmPassword';
  confirmPassword.type = 'password';
  confirmPassword.placeholder = 'Confirm your password';

  const buttonSign = document.createElement('button');
  buttonSign.textContent = 'SIGN UP';
  buttonSign.className = 'buttonSignUp';
  buttonSign.id = 'buttonSign';

  const frase = document.createElement('h6'); // boton que dirige a register
  frase.textContent = 'Already have an account? Login here ';
  frase.className = 'frase';

  const or = document.createElement('h5'); // linea y or
  or.textContent = 'or';
  or.className = 'or';

  buttonSign.textContent = 'Sign Up';

  const imgGoogle = document.createElement('img');
  imgGoogle.className = 'imgGoogle';
  imgGoogle.src = '../imagenes/iconogoogle.svg';
  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'buttonGoogle';
  const strong = document.createElement('strong');
  strong.textContent = 'Sign up with Google';
  strong.className = 'textGoogle';

  formRegister.appendChild(homeDiv);
  containerRegister.appendChild(logoCaffee);
  containerRegister.appendChild(homeDiv);
  containerRegister.appendChild(emailRegister);
  containerRegister.appendChild(nameRegister);
  containerRegister.appendChild(passwordRegister);
  containerRegister.appendChild(confirmPassword);
  containerRegister.appendChild(buttonSign);
  containerRegister.appendChild(frase);
  containerRegister.appendChild(or);
  containerRegister.appendChild(buttonGoogle);
  buttonGoogle.append(imgGoogle, strong);

  // buttonSign.addEventListener('click', () => onNavigate('/'));
  buttonSign.addEventListener('click', () => registerWithEmail); // entrar al perfil
  buttonSign.addEventListener('click', () => {
    const emailValue = emailRegister.value;
    const nameValue = nameRegister.value;
    const passwordValue = passwordRegister.value;
    const confirmPasswordValue = confirmPassword.value;

    const userInfo = {
      // lo creamos para que reciba las propiedas del formular
      email: emailValue,
      name: nameValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
    };

    // funcion para hacer el import y que nos rederija a la pagina que necesitamos
    registerWithEmail(userInfo.email, userInfo.password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // alert('Register Accepted');
        window.location.href = '/login'; // pendiente redirigir al perfil
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // alert('Please Try Again');
        window.location.href = '/register'; // pendiente redirigir al Home
      });
  });
  frase.addEventListener('click', () => onNavigate('/login'));
  buttonGoogle.addEventListener('click', () => signInWithGoogle());

  return containerRegister;
};
