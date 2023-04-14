import { auth } from '../lib/fireBase';
import {
  onPostsChange,
  addCommentToPost,
  addPost,
  deletePost,
  getComments,
  updatePost,
  sumLike,
  removeLike,
} from '../lib/Collecction';
import { signOutUser } from '../lib/Autenticacion';
import { onNavigate } from '../router';

console.log(auth);

export const Feed = () => {
  // en caso de no estar logueado se redirige al login, no puede entrar al feed
  /* if (!auth.currentUser) {
    window.location.href = '/login';
    return '';
  } */
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

      // foto post
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

      // eslint-disable-next-line no-unused-vars
      const currentUserLike = auth.currentUser.uid;
      const postLike = doc.data().likes;

      const likeInterfaz = document.createElement('p');
      likeInterfaz.id = 'likeInterfaz';
      likeInterfaz.className = 'likeInterfaz';
      const likeNum = postLike.length + 1;
      likeInterfaz.textContent = `${likeNum} likes`;
      const containerLike = document.createElement('div');
      containerLike.className = 'containerLike';
      const like = document.createElement('img');
      like.className = 'like';
      like.id = 'like';
      like.setAttribute('like', doc.data().id);
      like.src = '../imagenes/like1.png'; // corazon rosa
      like.textContent = doc.data().likes.length;
      like.style.display = 'none';
      // console.log(prueba === undefined?0:prueba.length); Operador Ternario
      // like.style.display = 'none';
      const dislike = document.createElement('img');
      dislike.className = 'dislike';
      dislike.src = '../imagenes/like.png'; // corazon fondo blanco
      // dislike.style.display = 'none';

      if (postLike.includes(auth.currentUser.uid)) {
        like.style.display = 'flex';
        dislike.style.display = 'none';
      } else {
        like.style.display = 'none';
        dislike.style.display = 'flex';
      }

      // Botón like y función para dar like y dislike
      // eslint-disable-next-line no-unused-vars
      let userLiked = false; // variable para mantener el me gusta del usuario
      containerLike.addEventListener('click', async () => { // llamamos al icono like
        console.log(doc.data);
        updatePost(doc.ref, {
          likes: [...doc.data().likes, auth.currentUser.uid],
        }); // spread operation
        // obtenemos el id de la publicacion
        const postId = doc.id;
        // obtenemos los datos del objet
        const post = doc.data();
        // verifica si el id del usuario esta incluido en los me gusta del post
        // se usa includes() para saber si en un array hay un cierto valor
        if (post.likes.includes(auth.currentUser.uid)) {
          // removeLike lo usamos para restar si ya dío el megusta
          removeLike(postId, auth.currentUser.uid);
          userLiked = false;
        } else {
          // si el usuario no ha dado sumLike nos suma los me gusta
          sumLike(postId, auth.currentUser.uid);
          userLiked = true;
        }
        console.log(document);
      });

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
      iconDelete.style.display = 'none';
      const iconEdit = document.createElement('img');
      iconEdit.className = 'iconEdit';
      iconEdit.src = '../imagenes/editar.png';
      iconEdit.style.display = 'none';
      console.log(doc);

      // solo el post del usuario aparezca los iconos

      // debemos obtener al usuario
      const currentUser = auth.currentUser.uid;
      const postUser = doc.data().id;
      if (currentUser === postUser) {
        iconDelete.addEventListener('click', async () => {
          // si los usuarios son iguales se eliminan
          await deletePost(doc.id);
        });
        // solo el post del usuario aparezca los iconos
        if (postUser === currentUser) {
          iconDelete.style.display = 'flex';
          iconEdit.style.display = 'flex';
        }
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
      const cancelEditPost = document.createElement('button');
      cancelEditPost.className = 'cancelEditPost';
      cancelEditPost.textContent = 'Cancel';

      containerFeed.appendChild(modalEditPost);
      modalEditPost.appendChild(createEditPost);
      createEditPost.append(titleEditPost, textEditPost, saveEditPost, cancelEditPost);

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

          cancelEditPost.addEventListener('click', () => {
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

        iconDelete.addEventListener(
          'click',
          async () => {
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
        likeInterfaz,
        descPost,
        parrafoComentario,
        inputComments,
      );
      title.append(imgWonderland, strong, iconEdit, iconDelete);
      sectionIconos.append(containerLike, favorite, iconComment, save);
      containerLike.append(like, dislike);
      descPost.append(commentName, commentPost);
      inputComments.append(descriptionComment, buttonComment);
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
  const buttonPicture = document.createElement('input');
  buttonPicture.type = 'file';
  buttonPicture.id = 'buttonPicture';
  buttonPicture.accept = 'image/png, image/jpeg';
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
      console.log('holaaaa');
      console.log(buttonPicture.files);
      const post = {
        Title: titlePost.value,
        comments: textPost.value,
        date: new Date(),
        // se obtiene el nombre de usuario de la autenticación
        userName: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        likes: [],
      };
      /* await addPost(post);
      titlePost.value = '';
      textPost.value = ''; */
    }
  });
  return containerFeed;
};
