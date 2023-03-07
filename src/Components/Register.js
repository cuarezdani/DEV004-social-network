import { onNavigate } from '../router/navigate';


export const Register = () => {
const HomeDiv = document.createElement('div');
HomeDiv.texContent = 'Create your account';
const buttonHome = document.createElement('button');

buttonHome.textContent = 'Login Here';

buttonHome.addEventListener('click', () => onNavigate ('/'));

HomeDiv.appendChild(buttonHome);

return HomeDiv;
};