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

  const errorRegister = document.createElement('h4');
  errorRegister.className = 'errorMessage';
  errorRegister.textContent = 'errorMessage';
  errorRegister.style.display = 'none';

  const formRegister = document.createElement('form');
  formRegister.className = 'formRegister';
  formRegister.id = 'formRegister';

  const emailRegister = document.createElement('input');
  emailRegister.id = 'correoRegister';
  emailRegister.type = 'email';
  emailRegister.placeholder = 'Email Address';

  const nameRegister = document.createElement('input');
  nameRegister.id = 'nombre';
  nameRegister.type = 'text';
  nameRegister.placeholder = 'Full Name';

  const claveRegister = document.createElement('input');
  claveRegister.id = 'claveRegister';
  claveRegister.type = 'password';
  claveRegister.placeholder = 'Enter your password, at least 6 digits';

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

  formRegister.appendChild(containerRegister);
  containerRegister.appendChild(logoCaffee);
  containerRegister.appendChild(homeDiv);
  containerRegister.appendChild(errorRegister);
  containerRegister.appendChild(emailRegister);
  containerRegister.appendChild(nameRegister);
  containerRegister.appendChild(claveRegister);
  containerRegister.appendChild(confirmPassword);
  containerRegister.appendChild(buttonSign);
  containerRegister.appendChild(frase);
  containerRegister.appendChild(or);
  containerRegister.appendChild(buttonGoogle);
  buttonGoogle.append(imgGoogle, strong);

  // buttonSign.addEventListener('click', () => onNavigate('/'));
  // buttonSign.addEventListener("click", () => registerWithEmail); // entrar al perfil
  buttonSign.addEventListener('click', () => {
    const emailValue = emailRegister.value;
    const nameValue = nameRegister.value;
    const passwordValue = claveRegister.value;
    const confirmPasswordValue = confirmPassword.value;
    console.log(passwordValue);

    const userInfo = {
      // lo creamos para que reciba las propiedas del formular
      email: emailValue,
      name: nameValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
    };

    console.log(userInfo);

    // funcion para hacer el import y que nos rederija a la pagina que necesitamos
    registerWithEmail(
      userInfo.email,
      userInfo.password,
      userInfo.name, // se guardara la inf en el campo display name
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // alert('Register Accepted');
        window.location.href = '/login'; // pendiente redirigir al perfil
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === 'auth/network-request-failed.') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Fields cannot be empty.';
        } else if (errorCode === 'auth/weak-password') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'The password must be at least 6 characters.';
        } else if (errorCode === 'auth/invalid-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Invalid email.';
        } else if (errorCode === 'auth/missing-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Email field cannot be empty.';
        } else if (errorCode === 'auth/email-already-in-use') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Email already in use.';
        } else if (errorCode === 'auth/internal-error') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Password field cannot be empty.';
        }
        return error;

        // const errorMessage = error.message;

        // alert('Please Try Again');
        // window.location.href = '/register'; // pendiente redirigir al Home
      });
  });

  frase.addEventListener('click', () => onNavigate('/login'));
  buttonGoogle.addEventListener('click', () => signInWithGoogle());

  return containerRegister;
};
