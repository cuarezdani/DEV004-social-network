// import { onNavigate } from '../router';
import { auth } from '../lib/fireBase';
import {
  onPostsChange,
  addCommentToPost,
  addPost,
  deletePost,
  getComments,
  updatePost,
} from '../lib/Collecction';
console.log(auth);

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
  postsSection.className = 'postsSection';
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
      const imgWonderland = document.createElement('img'); // dejaremos la foto del logo como default
      imgWonderland.className = 'imgWonderland';
      imgWonderland.src = '../imagenes/logo1.png';
      const strong = document.createElement('p');
      strong.textContent = doc.data().Title;
      strong.className = 'textWonderland';

      const fotoMuro = document.createElement('img');
      fotoMuro.className = 'fotoMuro';
      fotoMuro.textContent = doc.data().image;
      fotoMuro.src = '../imagenes/emilliecoffee.jpg';

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
      favorite.className = 'favoriteFeed';
      favorite.src = '../imagenes/favorite.png';

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

      const iconComment = document.createElement('img');
      iconComment.className = 'iconComment';
      iconComment.src = '../imagenes/comment.png';
      iconComment.id = 'iconComment';

      const save = document.createElement('img');
      save.className = 'save';
      save.src = '../imagenes/guardar.png';

      // description post lo que se sube en el modal
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

      iconDelete.addEventListener('click', async () => {
        await deletePost(doc.ref);
      });

      // Modal para editar post
      const modalEditPost = document.createElement('section');
      modalEditPost.id = 'modalEditPost';
      modalEditPost.className = 'modalEditPost';
      modalEditPost.style.display = 'none';
      const createEditPost = document.createElement('div');
      createEditPost.class = 'modal-contentEdit';
      const titleEditPost = document.createElement('input');
      titleEditPost.className = 'titlePost';
      titleEditPost.type = 'text';
      titleEditPost.placeholder = 'Edit Name Coffee Shop';
      titleEditPost.id = 'titlePost';
      const textEditPost = document.createElement('input');
      textEditPost.className = 'textPost';
      textEditPost.type = 'text';
      textEditPost.placeholder = 'Edit a comment';
      const saveEditPost = document.createElement('button');
      saveEditPost.className = 'savePost';
      saveEditPost.textContent = 'Save';

      containerFeed.appendChild(modalEditPost);
      modalEditPost.appendChild(createEditPost);
      createEditPost.append(titleEditPost, textEditPost, saveEditPost);

      // eslint-disable-next-line no-unused-vars
      const modal = document.getElementById('modalPost');
      iconEdit.addEventListener('click', () => {
        modalEditPost.style.display = 'block';
      });

      saveEditPost.addEventListener('click', () => {
        modalEditPost.style.display = 'none';
      });

      saveEditPost.addEventListener('click', async () => {
        try {
          await updatePost(doc.ref, { comments: textEditPost.value, Title: titleEditPost.value });
        } catch (err) {
          console.log(err);
        }
      });

      // comentario y boton
      const inputComments = document.createElement('div');
      inputComments.className = 'inputComments';
      inputComments.style.display = 'none';
      const descriptionComment = document.createElement('input');
      descriptionComment.type = 'text';
      descriptionComment.placeholder = 'write a comment';
      descriptionComment.id = 'comment';
      descriptionComment.textContent = doc.data().comment;

      iconComment.addEventListener('click', () => {
        if (inputComments.style.display === 'none') {
          inputComments.style.display = 'block';
        }
      });

      const buttonComment = document.createElement('button');
      buttonComment.className = 'btnComment';
      buttonComment.textContent = 'send';

      buttonComment.addEventListener('click', async () => {
        if (descriptionComment.value) {
          await addCommentToPost(doc.ref, descriptionComment.value);
          descriptionComment.value = '';
        }
      });

      const parrafoComentario = document.createElement('div');
      parrafoComentario.className = 'parrafoComentario';

      // recorre el array de comentarios y los muestra
      getComments(doc.ref, (queryComments) => {
        const arrayQueryComments = [];
        queryComments.forEach((commentDoc) => {
          const parrafo = document.createElement('p');
          parrafo.className = 'parrafo';
          parrafo.textContent = commentDoc.data().comment;
          parrafoComentario.append(parrafo);
          console.log(commentDoc.data().comment);
          arrayQueryComments.push(parrafo);
        });
        parrafoComentario.replaceChildren(...arrayQueryComments);
      });

      buttonComment.addEventListener('click', () => {
        inputComments.style.display = 'none';
      });

      // postsSection.append(section);
      section.append(
        title,
        fotoMuro,
        sectionIconos,
        descPost,
        parrafoComentario,
        inputComments,
      );
      title.append(imgWonderland, strong, iconEdit, iconDelete);
      sectionIconos.append(like, likeContador, favorite, iconComment, save);
      descPost.append(commentPost);
      inputComments.append(descriptionComment, buttonComment);
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

  // Modal para crear post
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

  savePost.addEventListener('click', async () => {
    if (textPost.value) {
      console.log(textPost.value);
      const post = {
        Title: titlePost.value,
        comments: textPost.value,
        date: new Date(),
        // id: auth.currentUser.uid,
      };
      await addPost(post);
      titlePost.value = '';
      textPost.value = '';
    }
  });
  return containerFeed;
};
