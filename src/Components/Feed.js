// import { onNavigate } from '../router';

import { onPostsChange, addCommentToPost, addPost } from '../lib/Collecction';

export const Feed = () => {
  const containerFeed = document.createElement('div');
  containerFeed.className = 'containerFeed';

  const logoFeed = document.createElement('h2');
  // logoFeed.src = '../imagenes/logo1.png';
  logoFeed.className = 'logoFeed';
  logoFeed.textContent = 'COFFE HOUR';

  const lineaDorada = document.createElement('hr');
  lineaDorada.className = 'lineaDorada';
  const linea = document.createElement('hr'); // linea y or
  linea.className = 'linea';

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
  containerFeed.append(lineaDorada);

  const postsSection = document.createElement('section');
  containerFeed.append(postsSection);

  onPostsChange((querySnapshot) => {
    // querySnapshot contiene todos los documentos de nuestra colección
    console.log(querySnapshot);
    const arraySection = [];
    querySnapshot.forEach((doc) => {
      // forEach recorre el array de los documentos
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
      fotoMuro.src = '../imagenes/muro1.png';

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

      // description post
      const descPost = document.createElement('div');
      descPost.className = 'describePost';
      const commentPost = document.createElement('p');
      commentPost.textContent = doc.data().comments;
      commentPost.className = 'commentsPost';
      const iconDelete = document.createElement('img');
      iconDelete.className = 'iconDelete';
      iconDelete.src = '../imagenes/borrar.png';
      const iconEdit = document.createElement('img');
      iconEdit.className = 'iconEdit';
      iconEdit.src = '../imagenes/editar.png';

      // comentario y boton
      const inputComments = document.createElement('div');
      inputComments.className = 'inputComments';
      inputComments.style.display = 'none';
      const comment = document.createElement('input');
      comment.type = 'text';
      comment.placeholder = 'write a comment';
      comment.id = 'comment';

      iconComment.addEventListener('click', () => {
        if (inputComments.style.display === 'none') {
          inputComments.style.display = 'block';
        } else {
          inputComments.style.display = 'none';
        }
      });

      const buttonComment = document.createElement('button');
      buttonComment.className = 'btnComment';
      buttonComment.textContent = 'send';

      buttonComment.addEventListener('click', async () => {
        if (comment.value) {
          console.log(doc.ref);
          console.log(comment.value);
          await addCommentToPost(doc.ref, comment.value);
        }
      });

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

      // postsSection.append(section);
      section.append(title, fotoMuro, sectionIconos, inputComments, descPost);
      title.append(imgWonderland, strong);
      sectionIconos.append(like, favorite, iconComment, save);
      descPost.append(commentPost, iconEdit, iconDelete);
      inputComments.append(comment, buttonComment);
      // containerFeed.appendChild(sectionComments);
      // sectionComments.append(inputComments);
      arraySection.push(section);
    });
    postsSection.replaceChildren(...arraySection);
  });

  // MENÚ ICONOS PIE DE PAGINA
  const menuIcono = document.createElement('section');
  menuIcono.className = 'menuIcono';
  const profileIcono = document.createElement('img'); // menu perfil
  profileIcono.className = 'profileIcono';
  profileIcono.src = '../imagenes/usuario.png';
  const addIcono = document.createElement('img'); // suma
  addIcono.className = 'addIcono';
  addIcono.src = '../imagenes/mas.png';
  const signOut = document.createElement('img'); // icono puerta
  signOut.className = 'signOut';
  signOut.src = '../imagenes/cerrar-sesion.png';

  containerFeed.appendChild(menuIcono);
  menuIcono.append(profileIcono, addIcono, signOut);

  // Modal
  const modalPost = document.createElement('section');
  modalPost.id = 'modalPost';
  modalPost.className = 'modalPost';
  const createPost = document.createElement('div');
  createPost.class = 'modal-content';
  const titlePost = document.createElement('input');
  titlePost.className = 'titlePost';
  titlePost.type = 'text';
  titlePost.placeholder = 'Name Coffee Shop';
  titlePost.id = 'titlePost';
  const textPost = document.createElement('input');
  textPost.className = 'textPost';
  textPost.type = 'text';
  textPost.placeholder = 'Write a comment';
  const buttonPicture = document.createElement('button');
  buttonPicture.className = 'buttonPicture';
  buttonPicture.textContent = 'add picture';
  const savePost = document.createElement('button');
  savePost.className = 'savePost';
  savePost.textContent = 'Save';

  containerFeed.appendChild(modalPost);
  modalPost.appendChild(createPost);
  createPost.append(titlePost, textPost, buttonPicture, savePost);

  /* </div>addIcono.addEventListener('click', () => {
    if (createPost.style.display === 'none') {
      createPost.style.display = 'block';
    } else {
      createPost.style.display = 'none';
    }
  }); */
  // eslint-disable-next-line no-unused-vars
  const modal = document.getElementById('modalPost');
  // eslint-disable-next-line no-unused-vars
  const suma = document.querySelector('.addIcono');
  addIcono.addEventListener('click', () => {
    modalPost.style.display = 'block';
  });

  savePost.addEventListener('click', () => {
    modalPost.style.display = 'none';
  });

  /* window.addEventListener('click', (event) => {
    if (event.target === modalPost) {
      modalPost.style.display = 'none';
    }
  }); */

  savePost.addEventListener('click', async () => {
    if (textPost.value) {
      console.log(textPost.value);
      const post = {
        Title: titlePost.value,
        comments: textPost.value,
      };
      await addPost(post);
    }
  });
  return containerFeed;
};
