import { onNavigate } from '../router/navigate';

export const Home = () => {
  const homeDiv = document.createElement("div");
  const buttonLogin = document.createElement("button"); //register video
  const buttonRegister = document.createElement("button"); //login video

  buttonLogin.textContent = "Login";
  buttonRegister.textContent = "Sign up";

  
  buttonRegister.addEventListener ('click', () => onNavigate('/register'));
  buttonLogin.addEventListener ('click', () => onNavigate('/login'));

  homeDiv.appendChild(buttonLogin);
  homeDiv.appendChild(buttonRegister);  

  return homeDiv;
};