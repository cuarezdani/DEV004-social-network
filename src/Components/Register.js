import { onNavigate } from '../main.js';

export const Register = () => {
const HomeDiv = document.createElement('div');
HomeDiv.texContent = 'Create your account';
const buttonHome = document.createElement('button');

buttonHome.textContent = 'Login here';

buttonHome.addEventListener('click', () => onNavigate ('/'));

HomeDiv.appendChild(buttonHome);

return HomeDiv;
};