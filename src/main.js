// Este es el punto de entrada de tu aplicacion
import { Home } from './Components/Home.js';
import { Register } from './Components/Register.js';
import { Login } from './Components/Login.js';

const rootDiv = document.getElementById('root');

const routes = {
  "/": Home,
  "/login": Login,
  "/register": Register,
};

export const onNavigate = (pathname) => {
    windows.history.pushState(
        {},
        pathname,
        windown.location.origin + pathname,
        );
    while (rootDiv.firstChild){
    rootDiv.removeChild(rootDiv.firstChild);
    };
    rootDiv.appendChild(routes[pathname]());
}

const component =routes[window.location.pathname];

windown.onpopstate = () => {
    rootDiv.appendChild(component());
};

rootDiv.appendChild(component());