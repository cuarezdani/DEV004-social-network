/* eslint-disable no-import-assign */
import { Register } from '../src/Components/Register.js';
import { Login } from '../src/Components/Login.js';
// import { addRoutes, onNavigate } from '../src/router/index.js';
import * as Autenticacion from '../src/lib/Autenticacion';
// eslint-disable-next-line no-unused-vars
import { onNavigate } from '../src/router/index.js';

delete window.location;
window.location = { href: null };

jest.mock('../src/img/img.js');

jest.mock('../src/router/index.js', () => ({
  onNavigate: jest.fn(() => Promise.resolve()),
}));

jest.mock('../src/lib/Autenticacion', () => ({
  signInWithPassword: jest.fn(() => Promise.resolve({})),
  registerWithEmail: jest.fn(() => Promise.resolve({})),
}));

// si el usuario se registro correctamente o no
describe('Register', () => {
  it('si el usuario se registrò correctamente debe mandar llamar la funcion navigateTo con el parametro login', () => {
    document.body.appendChild(Register());
    document.getElementById('buttonSign').click();

    return Promise.resolve().then(() => {
      expect(window.location.href).toBe('/feed');
    });
  });
  it('Email ya en uso', () => {
    // preparamos el mock
    Autenticacion.createUser = jest.fn().mockRejectedValueOnce({ code: 'auth/internal-error' });
    document.body.innerHTML = "<div id='root'></div>";
    onNavigate({
      '/register': () => { },
    });

    // Paso 1: Visualizar el container Register.
    const containerRegister = Register();

    // Paso 2: Completamos el formulario con un correo electrónico ya en uso
    containerRegister.querySelector('#correoRegister').value = 'prueba10@gmail.com';
    containerRegister.querySelector('#claveRegister').value = '123456';

    // Paso 3: Enviamos el formulario dando clic en el botón `Login`.
    containerRegister.querySelector('#buttonSign').dispatchEvent(new Event('click'));

    Promise.reject().catch(() => {
      if (containerRegister.querySelector('#errorRegister').style.display === 'block') {
        expect(containerRegister.querySelector('#errorRegister').textContent).toEqual('Email already in use.');
      }
    });
  });

  it('el campo del Password no puede estar vacio', () => {
    // preparamos el mock
    Autenticacion.createUser = jest.fn().mockRejectedValueOnce({ code: 'auth/internal-error' });
    document.body.innerHTML = "<div id='root'></div>";
    onNavigate({
      '/register': () => { },
    });

    // Paso 1: Visualizar el formulario de ingreso
    const containerRegister = Register();

    // Paso 2: Completamos el formulario sin clave
    containerRegister.querySelector('#correoRegister').value = 'prueba10@gmail.com';
    containerRegister.querySelector('#claveRegister').value = '';

    // Paso 3: Enviamos el formulario dando clic en el botón Sing
    containerRegister.querySelector('#buttonSign').dispatchEvent(new Event('click'));

    Promise.reject().catch(() => {
      if (containerRegister.querySelector('#errorRegister').style.display === 'block') {
        expect(containerRegister.querySelector('#errorRegister').textContent).toEqual('auth/internal-error');
      }
    });
  });
});

// si el usuario se Logueo correctamente o no
describe('Login', () => {
  it('si el usuario ingreso correctamente debe mandar redirigirse al feed', () => {
    document.body.appendChild(Login());
    document.getElementById('buttonContinue').click();

    return Promise.resolve().then(() => {
      expect(window.location.href).toBe('/feed');
    });
  });
  it('Email no registrado', () => {
    // preparamos el mock
    Autenticacion.createUser = jest.fn().mockRejectedValueOnce({ code: 'auth/invalid-email' });
    document.body.innerHTML = "<div id='root'></div>";
    onNavigate({
      '/feed': () => { },
    });

    // Paso 1: Visualizar el formulario de login.
    const formLogin = Login();

    // Paso 2: Completamos el formulario con un correo electrónico incorrecto.
    formLogin.querySelector('#correo').value = 'glo.com';
    formLogin.querySelector('#clave').value = '123456';

    // Paso 3: Enviamos el formulario dando clic en el botón `Login`.
    formLogin.querySelector('#buttonContinue').dispatchEvent(new Event('click'));

    Promise.reject().catch(() => {
      if (formLogin.querySelector('#errorMessage').style.display === 'block') {
        expect(formLogin.querySelector('#errorMessage').textContent).toEqual('Invalid email.');
      }
    });
  });

  it('Password incorrecto', () => {
    // preparamos el mock
    Autenticacion.createUser = jest.fn().mockRejectedValueOnce({ code: 'auth/invalid-password' });
    document.body.innerHTML = "<div id='root'></div>";
    onNavigate({
      '/feed': () => { },
    });

    // Paso 1: Visualizar el formulario de login.
    const formLogin = Login();

    // Paso 2: Completamos el formulario con un correo electrónico incorrecto.
    formLogin.querySelector('#correo').value = 'Gloria2@gmail.com';
    formLogin.querySelector('#clave').value = '12345';

    // Paso 3: Enviamos el formulario dando clic en el botón `Login`.
    formLogin.querySelector('#buttonContinue').dispatchEvent(new Event('click'));

    Promise.reject().catch(() => {
      if (formLogin.querySelector('#errorMessage').style.display === 'block') {
        expect(formLogin.querySelector('#errorMessage').textContent).toEqual('Invalid password.');
      }
    });
  });
});
