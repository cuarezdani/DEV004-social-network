import { auth } from '../lib/fireBase';
import {
  onPostsChange,
  addCommentToPost,
  addPost,
  deletePost,
  getComments,
  updatePost,
  likes,
} from '../lib/Collecction';
import { signOutUser } from '../lib/Autenticacion';
import { onNavigate } from '../router';

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

  containerFeed.append(logoFeed);
  containerFeed.append(lineaDorada);

  const postsSection = document.createElement('section');
  postsSection.className = 'postsSection';
  containerFeed.append(postsSection);

  onPostsChange((querySnapshot) => {
    // querySnapshot contiene todos los documentos de nuestra colección
    // console.log(querySnapshot);
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

      // Iconos
      const sectionIconos = document.createElement('div');
      sectionIconos.className = 'sectionIconos';
      const favorite = document.createElement('img');
      favorite.className = 'favoriteFeed';
      favorite.src = '../imagenes/favorite.png';
  
      // Likes
      const like = document.createElement('img');
      like.className = 'like';
      like.setAttribute = ('like', doc.data().id);
      like.src = '../imagenes/like.png';
      like.textContent = doc.data().likes;
      const likesContador = document.createElement('p');
      likesContador.className = 'likeContador';
      const postLike = doc.data().likes;
      const likeContador = postLike;
      console.log(postLike);
      likesContador.textContent = `${likeContador} likes`;
      const buttonLike =  postsSection.querySelectorAll('like');
      buttonLike.forEach((like) => {
        like.addEventListener('click', async () => { 
        const currentUser = like.getAttribute('like');
        if (currentUser === doc.data().id){
          await 
          await deletePost(doc.id);
      })
      /*
      let likes = 0; // comienza el contador con el 0
      likeContador.textContent = doc.data().likes; // nos deberia dar lo escrito del like
      // se usa handle para los eventos del boton dando funcionalidades en el metodo click
      function handleLikeClick() {
        // eslint-disable-next-line no-plusplus
        likes++;
        likeContador.textContent = doc.data().likes;
      } */
      // se llama al like para qeu sea escuchado en el dom
      // like.addEventListener('click',  handleLikeClick );

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
      const commentName = document.createElement('strong');
      commentName.textContent = doc.data().userName;
      commentName.className = 'commentName';
      const commentPost = document.createElement('p');
      commentPost.textContent = doc.data().comments;
      commentPost.className = 'commentsPost';
      const iconDelete = document.createElement('img');
      iconDelete.className = 'iconDelete';
      iconDelete.src = '../imagenes/borrar.png';
      const iconEdit = document.createElement('img');
      iconEdit.className = 'iconEdit';
      iconEdit.src = '../imagenes/editar.png';
      console.log(doc);

      /* iconDelete.addEventListener('click', async () => {
        await deletePost(doc.ref);
      }); */
      // iconDelete.addEventListener('click', async () => {
      // debemos obtener al usuario
      const currentUser = auth.currentUser.uid;
      const postUser = doc.data().id;
      if (currentUser === postUser) {
        iconDelete.addEventListener('click', async () => {
          // si los usuarios son iguales se eliminan
          await deletePost(doc.id);
        }, /* else {
            console.log('You can not delete this post.');
          }
        } else {
          console.log('You need to login to delete a post.'); */
        );
      }
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
      saveEditPost.className = 'saveEditPost';
      saveEditPost.textContent = 'Save';

      containerFeed.appendChild(modalEditPost);
      modalEditPost.appendChild(createEditPost);
      createEditPost.append(titleEditPost, textEditPost, saveEditPost);

      // eslint-disable-next-line no-unused-vars
      const currentUserEdit = auth.currentUser.uid;
      const postUserEdit = doc.data().id;
      if (currentUserEdit === postUserEdit) {
        // eslint-disable-next-line no-unused-vars
        const modal = document.getElementById('modalPost');
        iconEdit.addEventListener('click', () => {
          modalEditPost.style.display = 'block';

          saveEditPost.addEventListener('click', () => {
            modalEditPost.style.display = 'none';
          });

          saveEditPost.addEventListener('click', async () => {
            try {
              await updatePost(doc.ref, {
                comments: textEditPost.value,
                Title: titleEditPost.value,
              });
            } catch (err) {
              console.log(err);
            }
          });
        });

        iconDelete.addEventListener('click', async () => {
          // si los usuarios son iguales se eliminan
          await deletePost(doc.id);
        }, /* else {
            console.log('You can not delete this post.');
          }
        } else {
          console.log('You need to login to delete a post.'); */
        );
      }

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
      descPost.append(commentName, commentPost);
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

  profileIcono.addEventListener('click', () => {
    onNavigate('/profile');
  });
  // Botón de cerrar sesión
  signOut.addEventListener('click', () => {
    signOutUser()
      .then(() => {
        console.log(signOutUser(auth));
        onNavigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        return errorCode;
      });
  });
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
    console.log('asd', auth);
    if (textPost.value) {
      console.log(textPost.value);
      const post = {
        Title: titlePost.value,
        comments: textPost.value,
        date: new Date(),
        // se obtiene el nombre de usuario de la autenticación
        userName: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        likes: [],
      };
      await addPost(post);
      titlePost.value = '';
      textPost.value = '';
    }
  });
  return containerFeed;
};
