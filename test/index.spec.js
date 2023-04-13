/* eslint-disable no-import-assign */
import { Register } from '../src/Components/Register.js';
import { Login } from '../src/Components/Login.js';
// import { addRoutes, onNavigate } from '../src/router/index.js';
import * as Autenticacion from '../src/lib/Autenticacion';
// eslint-disable-next-line no-unused-vars
import { onNavigate } from '../src/router/index.js';

// const { document } = new JSDOM('').window;
// global.document = document;

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

delete window.location;
window.location = { href: null };

jest.mock('../src/router/index.js', () => ({
  onNavigate: jest.fn(() => Promise.resolve()),
}));

jest.mock('../src/lib/Autenticacion', () => ({
  signInWithPassword: jest.fn(() => Promise.resolve({})),
  registerWithEmail: jest.fn(() => Promise.resolve({})),
}));

/* jest.mock('../src/lib/Autenticacion', () => ({
  signInWithPassword: jest.fn(() => Promise.reject()),
})); */

// si el usuario se registro correctamente o no
describe('Register', () => {
  it('si el usuario se registrò correctamente debe mandar llamar la funcion navigateTo con el parametro login', () => {
    document.body.appendChild(Register());
    document.getElementById('buttonSign').click();

    return Promise.resolve().then(() => {
      expect(window.location.href).toBe('/feed');
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

/* describe('Pruebas de login', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-import-assign
    Autenticacion.signInWithGoogle = jest.fn();
    Autenticacion.signInWithPassword = jest.fn();
    router.onNavigate = jest.fn(() => console.log('mock de navigateTo usado'));
  });

  it( 'Autenticación con correo electrónico y
   contraseña correcta, debería redireccionar a /home', () => {
    // preparamos el mock
    Autenticacion.signInWithPassword.mockResolvedValueOnce(
      { user: { email: 'Gloria2@gmail.com' } });

    // Paso 1: Visualizar el formulario de login.
    const formLogin = Login();
    console.log(formLogin);
    // Paso 2: Completamos el formulario con un correo electrónico y contraseña correctos.
    // formLogin.querySelector('#email').value = 'Gloria2@gmail.com';

    // formLogin.querySelector('#password').value = '123456';

    // Paso 3: Enviamos el formulario dando clic en el botón `Login`.
    // formLogin.querySelector('#formLogin').dispatchEvent(new Event('submit'));
    const buttonContinue = document.getElementById('buttonContinue');
    buttonContinue.click();
    // Paso 4: Verificamos visualmente que la aplicación redija a `/home`.

    expect(window.location.href).toEqual('/feed');
  });
}); */

/* it('si el usuario NO se registra correctamente debe redirigir al home', () => {
  document.body.appendChild(Register()); // en el test me dice que document no está definido
  document.getElementById('buttonSign').click();
  console.log('Hola', window.location.href);
  expect(window.location.href).toBe('/login'); */

/*
describe('registerWithEmail', () => {
  it('debería ser una función', () => {
    // como sabemos si funcionara o no con las constantes hechas en register?
    // pero con las constantes de arriba o con los .value del usuario?
    const emailRegister = 'prueba@example.com';
    const passwordRegister = '1234567';
    expect(typeof registerWithEmail).toBe('function');
  });
});

// no se si de debe hacer con el registro o con la informacion del usuario en si???
describe('userInfo', () => {
  it('debería ser una función', () => {
    const emailValue = emailRegister.value;
    const nameValue = nameRegister.value;
    const passwordValue = passwordRegister.value;
    const confirmPasswordValue = confirmPassword.value;
    expect(typeof userInfo).toBe('function');
  });
});

describe('signInWithGoogle', () => {
  it('debería ser una función', () => {
    // como sabemos si funcionara o no con las constantes hechas en register?
    // pero con las constantes de arriba o con los .value del usuario?
    const emailRegister = 'prueba@google.com';
    const passwordRegister = '1234567';
    expect(typeof signInWithGoogle).toBe('function');
  });
});

// hacer aparte los botones? o se colocan en el register de arriba
// no necesitamos hacer test si tenemos los tarhet value
*/

// npx jest --watch
