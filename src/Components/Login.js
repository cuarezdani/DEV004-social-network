import { onNavigate } from '../router/navigate';

export const Login = () => {
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = 'Welcome';
    HomeDiv.textContent = 'Log in to Coffee Hour';
    const buttonHome = document.createElement('button');

    buttonHome.textContent = 'Sign Up';

    buttonHome.addEventListener('click', () => onNavigate('/'));

    HomeDiv.appendChild(buttonHome);

    return HomeDiv;

};