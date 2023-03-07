import { routes } from "./router/router";

const rootDiv = document.getElementById('root');

const component =routes[window.location.pathname];

window.onpopstate = () => {
    if (rootDiv.firstChild){
        rootDiv.removeChild(rootDiv.firstChild);
        };
    rootDiv.appendChild(component());
}

rootDiv.appendChild(component());