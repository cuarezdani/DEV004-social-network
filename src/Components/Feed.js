// import { onNavigate } from '../router';

// import { getPosts } from '../lib/Collecction';

import { collection, query, onSnapshot, getFirestore } from 'firebase/firestore';

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

  containerFeed.appendChild(logoFeed);

  const q = query(collection(getFirestore(), 'Posts'));
  // eslint-disable-next-line no-unused-vars
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const Posts = [];
    querySnapshot.forEach((doc) => {
      const section = document.createElement('section');
      section.className = 'sectionWonderland';
      const imgWonderland = document.createElement('img');
      imgWonderland.className = 'imgWonderland';
      imgWonderland.src = '../imagenes/wonderland.png';
      const strong = document.createElement('p');
      strong.textContent = 'Wonderland Coffee';
      // strong.textContent = Posts.comments;
      strong.className = 'textWonderland';

      const fotoMuro = document.createElement('img');
      fotoMuro.className = 'fotoMuro';
      // fotoMuro.src = Posts.image;
      fotoMuro.src = '../imagenes/muro1.png';

      /* const sectionComments = document.createElement('section');
      sectionComments.className = 'sectionComments';
      const inputComments = document.createElement('input'); // input para que escriban
      inputComments.type = 'text';
      inputComments.placeholder = 'Leave a comment'; */
      // pero se neceista llamar o dejar el comentario hacer boton? 

      // section general, span corazon+button, span favorito estrella+button,
      // span comentarios+button, span guardar+
      const sectionIconos = document.createElement('div');
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

      containerFeed.appendChild(section);
      section.append(imgWonderland, strong, fotoMuro, sectionIconos);
      sectionIconos.append(like, favorite, comment, save, likeContador);
      // containerFeed.appendChild(sectionComments);
      // sectionComments.append(inputComments);

      Posts.push(doc.data().comments);
    });
    console.log('Hola Mundo', Posts.join(', '));
  });

  /* getPosts().then((posts) => {
   console.log(posts); */

  /* posts.forEach((post) => {
    console.log(post);

    fotoMuro);
  }); */



  return containerFeed;
};
