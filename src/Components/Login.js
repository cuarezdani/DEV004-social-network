/* eslint-disable import/no-cycle */
import { onNavigate } from '../router/navigate';
import { signInWithGoogle, signInWithPassword } from '../lib/Autenticacion';

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
  emailInput.addEventListener('input', (e) => {
    // se agregan values para llamar a cada input y a la informacion que se guarda
    const emailValue = e.target.value;
  }); 

  const emailPassword = document.createElement('input');
  emailPassword.id = 'clave';
  emailPassword.type = 'password';
  emailPassword.placeholder = 'Enter your password';
  emailPassword.addEventListener('input', (e) => {
    // se agregan values para llamar a cada input y a la informacion que se guarda
    const passwordValue = e.target.value;
  });

  const forgotP = document.createElement('h4'); // debe redirigirte a un formulario para hacer tu clave
  forgotP.textContent = 'Forgot your password?';
  forgotP.className = 'forgotP';

  const buttonContinue = document.createElement('button');
  buttonContinue.textContent = 'Continue';
  buttonContinue.className = 'buttonContinue';

  const buttonSign = document.createElement('h6'); // boton que dirige a register
  buttonSign.textContent = 'Don’t have an account? Sign Up';
  buttonSign.className = 'buttonSign';

  const lineaOr = document.createElement('h5'); // linea y or
  lineaOr.textContent = 'or';
  lineaOr.className = 'lineaOr';

<<<<<<< HEAD
  // const buttonGoogle = document.createElement('button');
  // buttonGoogle.textContent = 'Sign in with Google';
  // buttonGoogle.className = 'buttonGoogle';

  const buttonGoogle = document.createElement('img');
=======
  const buttonGoogle = document.createElement('a');
  // buttonGoogle.textContent = 'Sign in with Google';
>>>>>>> 86589291f6740bcfa99e5f542f16133e7bb90f0f
  buttonGoogle.className = 'buttonGoogle';
  buttonGoogle.src = '../imagenes/googleblanco.png';

  const iconGoogle = document.createElement('img');
  iconGoogle.src = '../imagenes/google.png';
  iconGoogle.className = 'iconGoogle';

  const googleText = document.createElement('span');
  googleText.textContent = 'Sign in with Google';
  googleText.className = 'googleText';

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
<<<<<<< HEAD
  homeDivH2.appendChild(buttonGoogle);
=======
  containerLogin.appendChild(buttonGoogle);
  buttonGoogle.appendChild(iconGoogle);
  buttonGoogle.appendChild(googleText);
>>>>>>> 86589291f6740bcfa99e5f542f16133e7bb90f0f

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
        console.error(error);
        // Mostrar un mensaje de error al usuario
        alert('Invalid email or password.');
        window.location.href = '/login'; // si nos marca error nos manda al home
      });
  });

  buttonSign.addEventListener('click', () => onNavigate('/register'));
  buttonGoogle.addEventListener('click', () => signInWithGoogle());

  return containerLogin;
};
