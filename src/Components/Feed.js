import { onNavigate } from '../router';

export const Feed = () => {
  const containerFeed = document.createElement('div');
  containerFeed.className = 'containerFeed';

  const logoFeed = document.createElement('img');
  logoFeed.src = '../imagenes/logo1.png';
  logoFeed.className = 'logoFeed';

  // linea dorada por hacer
  const section = document.createElement('div');
  section.className = 'sectionWonderland';
  const imgWonderland = document.createElement('img');
  imgWonderland.className = 'imgWonderland';
  imgWonderland.src = '../imagenes/wonderland.png';
  const strong = document.createElement('p');
  strong.textContent = 'Wonderlandcafechile';
  strong.className = 'textWonderland';

  const fotoMuro = document.createElement('img');
  fotoMuro.className = 'fotoMuro';
  fotoMuro.src = '../imagenes/muro1.png';

  // section general, span corazon+button, span favorito estrella+button,
  // span comentarios+button, span guardar+
  const sectionIconos = document.createElement('section');
  sectionIconos.className = 'sectionIconos';
  const like = document.createElement('img');
  like.className = 'like';
  like.src = '../imagenes/like.png';
  const favorite = document.createElement('img');
  favorite.className = 'favorite';
  favorite.src = '../imagenes/favorite.png';
  const comment = document.createElement('img');
  comment.className = 'comment';
  comment.src = '../imagenes/comment.png';
  const save = document.createElement('img');
  save.className = 'save';
  save.src = '../imagenes/guardar.png';

  // comentarios me gusta + contador
  const texto = document.createElement('h3');
  texto.textContent = 'Me gusta';
  texto.className = 'textoMeGusta';

  /* const commentImg = document.createElement('section');
  commentImg.className = 'commentImg';
  const usuario = document.createElement('h3');
  usuario.className = 'usuario';
  usuario.textContent = 'cony_2';
  const comentario = document.createElement('h3');
  comentario.className = 'comentario;
  comentario.textContent = ' */

  containerFeed.appendChild(logoFeed);
  containerFeed.appendChild(imgWonderland);
  containerFeed.appendChild(section);
  section.append(imgWonderland, strong);
  containerFeed.appendChild(fotoMuro);
  containerFeed.appendChild(sectionIconos);
  sectionIconos.append(like, favorite, comment, save);

  return containerFeed;
};
