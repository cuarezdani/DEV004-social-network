import { Home } from './Components/Home.js';
import { Register } from './Components/Register.js';
import { Login } from './Components/Login.js';
import { Feed } from './Components/Feed.js';
import { Profile } from './Components/Profile.js';
import { initFirebase } from './lib/fireBase';
// import { routes } from './router/router';
import { onNavigate, addRoutes } from './router/index'; // modificar la ruta

// inicializamos el router
addRoutes({
  '/': Home,
  '/login': Login,
  '/register': Register,
  '/feed': Feed,
  '/profile': Profile,
});

// logica de la aplicacion
window.onload = () => {
  // cuando se carga la información nos seguramos que se ejecute el windown+location
  onNavigate(window.location.pathname);
};

window.onpopstate = () => {
  // evento que produce cambios en el historial de navegación
  onNavigate(window.location.pathname);
};

// authStateChangedEvent((user) => {
//   if (user) {
//     onNavigate('/feed');
//   } else {
//     onNavigate('/');
//   }
// });

// Initialize Firebase
initFirebase();
