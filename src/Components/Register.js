/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
import { onNavigate } from '../router/navigate';
import { signInWithGoogle, registerWithEmail } from '../lib/Autenticacion';

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
  emailRegister.addEventListener('input', (e) => {
    // se agregan values para llamar a cada input y a la informacion que se guarda
    const emailValue = e.target.value;
  });

  const nameRegister = document.createElement('input');
  nameRegister.id = 'nombre';
  nameRegister.type = 'Name';
  nameRegister.placeholder = 'Full Name';
  nameRegister.addEventListener('input', (e) => {
    const nameValue = e.target.value;
  });

  const passwordRegister = document.createElement('input');
  passwordRegister.id = 'claveRegister';
  passwordRegister.type = 'password';
  passwordRegister.placeholder = 'Enter your password, at least 6 digits';
  passwordRegister.addEventListener('input', (e) => {
    const passwordValue = e.target.value;
  });

  const confirmPassword = document.createElement('input'); // debe redirigirte a un formulario para hacer tu clave
  confirmPassword.id = 'confirmPassword';
  confirmPassword.type = 'password';
  confirmPassword.placeholder = 'Confirm your password';
  confirmPassword.addEventListener('input', (e) => {
    const confirmPasswordValue = e.target.value;
  });

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
  buttonGoogle.textContent = 'Sign in with Google';
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
        const user = userCredential.user;
        alert('Register Accepted');
        window.location.href = '/login'; // pendiente redirigir al perfil
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        alert('Please Try Again');
        window.location.href = '/register'; // pendiente redirigir al Home
      });
  });
  frase.addEventListener('click', () => onNavigate('/login'));
  buttonGoogle.addEventListener('click', () => signInWithGoogle());

  return containerRegister;
};
