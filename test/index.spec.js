// eslint-disable-next-line import/no-extraneous-dependencies
// import { JSDOM } from 'jsdom';
// importamos la funcion que vamos a testear
import { Register } from '../src/Components/Register.js';
import { Login } from '../src/Components/Login.js';

// eslint-disable-next-line no-unused-vars
import { onNavigate } from '../src/router/index.js';

// const { document } = new JSDOM('').window;
// global.document = document;

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

jest.mock('../src/router/index.js', () => ({
  onNavigate: jest.fn(() => Promise.resolve()),
}));

jest.mock('../src/lib/Autenticacion', () => ({
  registerWithEmail: jest.fn(() => Promise.resolve()),
}));

// si el usuario se registro correctamente o no
describe('Register', (done) => {
  it('si el usuario se registrò correctamente debe mandar llamar la funcion navigateTo con el parametro login', () => {
    document.body.appendChild(Register());
    document.getElementById('buttonSign').click();
    setTimeout(() => {
      expect(onNavigate).toHaveBeenCalledWith('/login');
      // eslint-disable-next-line no-undef
      done();
    }, 0);
  });
});

jest.mock('../src/lib/Autenticacion', () => ({
  signInWithPassword: jest.fn(() => Promise.resolve()),
}));

// si el usuario se Logueo correctamente o no
describe('Login', (done) => {
  it('si el usuario ingreso correctamente debe mandar redirigirse al Home', () => {
    document.body.appendChild(Login());
    document.getElementById('buttonContinue').click();
    setTimeout(() => {
      expect(window.location.href).toHaveBeenCalledWith('/');
      // eslint-disable-next-line no-undef
      done();
    }, 0);
  });
});
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
