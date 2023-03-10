// eslint-disable-next-line import/no-cycle
import { Home } from '../Components/Home.js';
import { Register } from '../Components/Register.js';
import { Login } from '../Components/Login.js';

export const routes = {
  '/': Home,
  '/login': Login,
  '/register': Register,
};
