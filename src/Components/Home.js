import { onNavigate } from '../main.js';

export const Home = () => {
  const HomeDiv = document.createElement("div");
  const buttonLogin = document.createElement("button"); //register video
  const buttonRegister = document.createElement("button"); //login video

  buttonLogin.textContent = "Login";
  buttonRegister.textContent = "Sign up";

  buttonRegister.addEventListener ('click', () => onNavigate('/register'));
  buttonLogin.addEventListener ('click', () => onNavigate('/login'));

  HomeDiv.appendchild(buttonLogin);
  HomeDiv.appendchild(buttonRegister);

  return HomeDiv;
};