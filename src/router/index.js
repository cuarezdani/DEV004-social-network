// aqui exportaras las funciones que necesites

// export const myFunction = () => {
//   // aqui tu codigo
//   console.log('Hola mundo!');
// };

const ROUTES = {};
export const onNavigate = (pathname) => {
  const path = typeof ROUTES[pathname] !== 'function' ? pathname : '/';
  window.history.pushState({}, path, window.location.origin + pathname); // ruta en la cual se mueve
  const rootSection = document.getElementById('root'); // vamos al html que nos une las paginas
  rootSection.innerHTML = '';
  rootSection.append(ROUTES[pathname]());
};

export const addRoutes = (routes) => {
  Object.keys(routes).reduce((currentRoutes, pathname) => {
    // seria buena agregar validaciones
    currentRoutes[pathname] = routes[pathname];
    return currentRoutes;
  }, ROUTES);
};
