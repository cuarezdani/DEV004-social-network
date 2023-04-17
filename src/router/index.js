// enrutamiento para cambiar el URL
// se define un objeto vacio para almecenar rutas
const ROUTES = {};
// se define una funcion onNavigate que tomara pathename como ruta que se navegará
export const onNavigate = (pathname) => {
// aquí asociamos la ruta a pthname o una ruta predeterminada que sería '/'
  const path = typeof ROUTES[pathname] !== 'function' ? pathname : '/';
  // usamos la ruta path para hacer el cambio de la url y actualizar la ventana
  // ruta en la cual se mueve
  window.history.pushState({}, path, window.location.origin + pathname);
  // vamos al html que nos une las paginas osea nuestro contenedor principal
  const rootSection = document.getElementById('root');
  rootSection.innerHTML = '';
  // se ejecuta la pagina correspondiente y luego es agregadoa como un hijo al contendor principal
  rootSection.append(ROUTES[pathname]());
};
// aqui addRoutes toma un obejto de rutas para luego utilizar
//  el reduce llevandonos a las nuevas rutas que necesitamos
export const addRoutes = (routes) => {
  Object.keys(routes).reduce((currentRoutes, pathname) => {
    currentRoutes[pathname] = routes[pathname];
    return currentRoutes;
  }, ROUTES);
};
