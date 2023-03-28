// import { onNavigate } from '../router';

import { onPostsChange } from '../lib/Collecction';

export const Feed = () => {
  const containerFeed = document.createElement('div');
  containerFeed.className = 'containerFeed';

  const logoFeed = document.createElement('img');
  logoFeed.src = '../imagenes/logo1.png';
  logoFeed.className = 'logoFeed';

  // linea dorada por hacer

  // cree section para que se contengan los comentarios y queden  con el otro section
  /* const commentImg = document.createElement('section');
  commentImg.className = 'commentImg';
  const usuario = document.createElement('h3');
  usuario.className = 'usuario';
  usuario.textContent = 'cony_2';
  const comentario = document.createElement('h3');
  comentario.className = 'comentario;
  comentario.textContent = ' */

  // se crea una variable para que se guarden los numeros de los likes
  // se crea un span el cual es un elemtno en linea que solo toma el espacio que se le da

  // like.getElementsById('clickbtn');
  //  function printClick() {
  //  console.log('hiciste click'); }
  // like.addEventListener('click', printClick);

  containerFeed.append(logoFeed);

  onPostsChange((querySnapshot) => {
    // querySnapshot contiene todos los documentos de nuestra colección
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => { // forEach recorre el array de los documentos
      const section = document.createElement('section');
      section.className = 'sectionWonderland';
      const title = document.createElement('div');
      title.className = 'title';
      const imgWonderland = document.createElement('img');
      imgWonderland.className = 'imgWonderland';
      imgWonderland.src = '../imagenes/wonderland.png';
      const strong = document.createElement('p');
      strong.textContent = doc.data().Title;
      strong.className = 'textWonderland';

      const fotoMuro = document.createElement('img');
      fotoMuro.className = 'fotoMuro';
      fotoMuro.textContent = doc.data().image;
      // fotoMuro.src = '../imagenes/muro1.png';

      /* const sectionComments = document.createElement('section');
      sectionComments.className = 'sectionComments';
      const inputComments = document.createElement('input'); // input para que escriban
      inputComments.type = 'text';
      inputComments.placeholder = 'Leave a comment'; */
      // pero se neceista llamar o dejar el comentario hacer boton?

      // section general, span corazon+button, span favorito estrella+button,
      // span comentarios+button, span guardar+

      // Iconos
      const sectionIconos = document.createElement('div');
      sectionIconos.className = 'sectionIconos';
      const like = document.createElement('img');
      like.className = 'like';
      like.src = '../imagenes/like.png';
      const favorite = document.createElement('img');
      favorite.className = 'favorite';
      favorite.src = '../imagenes/favorite.png';

      const iconComment = document.createElement('img');
      iconComment.className = 'iconComment';
      iconComment.src = '../imagenes/comment.png';
      iconComment.id = 'iconComment';

      const save = document.createElement('img');
      save.className = 'save';
      save.src = '../imagenes/guardar.png';

      // comentario y boton
      const inputComments = document.createElement('div');
      inputComments.className = 'inputComments';
      const comment = document.createElement('input');
      comment.type = 'text';
      comment.placeholder = 'write a comment';
      comment.id = 'comment';
      const buttonComment = document.createElement('button');
      buttonComment.className = 'btnComment';
      buttonComment.textContent = 'send';

      // Like
      const likeContador = document.createElement('span');
      likeContador.className = 'likes';
      let likes = 0; // comienza el contador con el 0
      likeContador.textContent = likes; // nos deberia dar lo escrito del like
      // se usa handle para los eventos del boton dando funcionalidades en el metodo click
      function handleLikeClick() {
        // eslint-disable-next-line no-plusplus
        likes++;
        likeContador.textContent = likes;
      }
      // se llama al like para qeu sea escuchado en el dom
      like.addEventListener('click', handleLikeClick);

      containerFeed.append(section);
      section.append(title, fotoMuro, sectionIconos, inputComments);
      title.append(imgWonderland, strong);
      sectionIconos.append(like, favorite, iconComment, save);
      inputComments.append(comment, buttonComment);

      // containerFeed.appendChild(sectionComments);
      // sectionComments.append(inputComments);
    });

    // docRef();

    /* const iconComment = document.getElementsById('iconComment');
    iconComment.addEventListener('click', (comment) => {
      const textToComment = comment.value;
      console.log(textToComment);
      savePost(textToComment);
      comment.value = '';
    }); */
  });

  return containerFeed;
};
