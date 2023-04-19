import { getStorage, ref, getDownloadURL } from 'firebase/storage';
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
import { addPicture } from '../lib/storage';
import {
  logo, favoriteFeed, likeFeed,
  dislikeFeed, iconCommentFeed,
  saveFeed, iconDeleteFeed,
  iconEditFeed, profileIconoFeed,
  addIconoFeed, signOutFeed, fotoDefault,
} from '../img/img.js';

const storage = getStorage();

export const Feed = () => {
  // se crea container para abarcar toda la informacion
  const containerFeed = document.createElement('div');
  containerFeed.className = 'containerFeed';

  const logoFeed = document.createElement('h2');
  logoFeed.className = 'logoFeed';
  logoFeed.textContent = 'COFFE HOUR';

  const lineaDorada = document.createElement('hr');
  lineaDorada.className = 'lineaDorada';
  const linea = document.createElement('hr'); // linea y or
  linea.className = 'linea';

  containerFeed.append(logoFeed);
  containerFeed.append(lineaDorada);

  const postsSection = document.createElement('section'); // section de los post
  postsSection.className = 'postsSection';
  containerFeed.append(postsSection);

  // eslint-disable-next-line consistent-return
  onPostsChange((querySnapshot) => {
    if (!auth.currentUser) { // condicion que si no esta logueado rediriga a home RUTAS
      window.location.href = '/';
      return '';
    }
    // querySnapshot contiene todos los documentos de nuestra colección
    const arraySection = []; // se recorre el array de los documentos en un string vacio
    querySnapshot.forEach((doc) => {
      // forEach recorre el array de los documentos
      const section = document.createElement('section');
      section.className = 'sectionWonderland';
      const title = document.createElement('div');
      title.className = 'title';
      const imgWonderland = document.createElement('img'); // dejaremos la foto del logo como default en cada publicacion
      imgWonderland.className = 'imgWonderland';
      imgWonderland.src = logo;
      const strong = document.createElement('p');
      strong.textContent = doc.data().Title;
      strong.className = 'textWonderland';

      // foto post
      const fotoMuro = document.createElement('img');
      fotoMuro.className = 'fotoMuro';
      fotoMuro.textContent = doc.data().image;
      fotoMuro.src = fotoDefault;

      // foto de storage
      if (doc.data().image) { // se crea la carpeta desde la data
        // cuando se trae la foto del strorage a la interfaz desde el URL (path)
        getDownloadURL(ref(storage, doc.data().image))
          .then((url) => {
            fotoMuro.setAttribute('src', url);
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            // Handle any errors
          });
      }

      // Iconos del post en si
      const sectionIconos = document.createElement('div');
      sectionIconos.className = 'sectionIconos';
      const favorite = document.createElement('img');
      favorite.className = 'favoriteFeed';
      favorite.src = favoriteFeed;

      // nuestro usuario autentificado da likes/dislike
      // eslint-disable-next-line no-unused-vars
      const currentUserLike = auth.currentUser.uid;
      const postLike = doc.data().likes; // explicar con lineas 114

      // likes
      const likeInterfaz = document.createElement('p');
      likeInterfaz.id = 'likeInterfaz';
      likeInterfaz.className = 'likeInterfaz';
      // likeInterfaz.style.display = 'none';
      const likeNum = postLike.length;
      likeInterfaz.textContent = `${likeNum} likes`; // objeto de cantidad dibujada
      const containerLike = document.createElement('div');
      containerLike.className = 'containerLike';
      const like = document.createElement('img');
      like.className = 'like';
      like.id = 'like';
      like.setAttribute('like', doc.data().id);
      like.src = likeFeed; // corazon rosa
      like.textContent = doc.data().likes.length;
      like.style.display = 'none';
      const dislike = document.createElement('img');
      dislike.className = 'dislike';
      dislike.src = dislikeFeed; // corazon fondo blanco

      // estilo de los corazones para que cambien de color
      // si se da like debe reconocer al usuario y no dar más likes
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
        updatePost(doc.ref, { // desde la referencia se actualiza el post
          // identificando nuevamente al usuario recorreindo los likes
          likes: [...doc.data().likes, auth.currentUser.uid], // ...spread operation
        });
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
        // console.log(document);
      });

      // Icono de comentario AL post
      const iconComment = document.createElement('img');
      iconComment.className = 'iconComment';
      iconComment.src = iconCommentFeed;
      iconComment.id = 'iconComment';

      const save = document.createElement('img');
      save.className = 'save';
      save.src = saveFeed;

      // description post lo que se sube en el modal
      const descPost = document.createElement('div');
      descPost.className = 'describePost';
      const commentName = document.createElement('strong');
      commentName.textContent = doc.data().userName;
      commentName.className = 'commentName';
      const commentPost = document.createElement('p'); // descripcion de la foto o cafeteria
      commentPost.textContent = doc.data().comments;
      commentPost.className = 'commentsPost';
      const iconDelete = document.createElement('img');
      iconDelete.className = 'iconDelete';
      iconDelete.src = iconDeleteFeed;
      iconDelete.style.display = 'none';
      const iconEdit = document.createElement('img');
      iconEdit.className = 'iconEdit';
      iconEdit.src = iconEditFeed;
      iconEdit.style.display = 'none';

      // debemos obtener al usuario
      const currentUser = auth.currentUser.uid;
      const postUser = doc.data().id;
      // solo el usuario logueado puede eliminar sus propios post
      if (currentUser === postUser) {
        iconDelete.addEventListener('click', async () => {
          // si el usuario coincide con el postUser se elimina el post
          await deletePost(doc.id);
        });
        // solo el post del usuario aparezca los iconos de borrar y editar
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
        const modal = document.getElementById('modalPost'); // se abre modal y se cierra
        iconEdit.addEventListener('click', () => {
          modalEditPost.style.display = 'block';

          saveEditPost.addEventListener('click', () => {
            modalEditPost.style.display = 'none';
          });
          // si ya no deseas editar se cancela la accion
          cancelEditPost.addEventListener('click', () => {
            modalEditPost.style.display = 'none';
          });
          // al apretar save te entregan los valores editados
          saveEditPost.addEventListener('click', async () => {
            try {
              await updatePost(doc.ref, {
                comments: textEditPost.value,
                Title: titleEditPost.value,
              });
            } catch (err) {
              // console.log(err);
            }
          });
        });
      }

      // Input del comentario AL post y click al boton
      const inputComments = document.createElement('div');
      inputComments.className = 'inputComments';
      inputComments.style.display = 'none';
      const descriptionComment = document.createElement('input');
      descriptionComment.type = 'text';
      descriptionComment.placeholder = 'write a comment';
      descriptionComment.id = 'comment';
      descriptionComment.textContent = doc.data().comment;

      // si le doy click al icono me aparecerce la cajita
      iconComment.addEventListener('click', () => {
        if (inputComments.style.display === 'none') {
          inputComments.style.display = 'block';
        }
      });

      // boton del input del comentario
      const buttonComment = document.createElement('button');
      buttonComment.className = 'btnComment';
      buttonComment.textContent = 'send';

      // se entrega el valor del comentario
      buttonComment.addEventListener('click', async () => {
        if (descriptionComment.value) {
          await addCommentToPost(doc.ref, descriptionComment.value);
          descriptionComment.value = '';
        }
      });
      // aquí se crea la caja contenedora del comentario
      const parrafoComentario = document.createElement('div');
      parrafoComentario.className = 'parrafoComentario';

      // recorre el array de comentarios y los muestra
      getComments(doc.ref, (queryComments) => {
        // se crea array vacio de la subcoleccion del documento
        const arrayQueryComments = [];
        queryComments.forEach((commentDoc) => {
          const parrafo = document.createElement('p');
          parrafo.className = 'parrafo';
          parrafo.textContent = commentDoc.data().comment;
          parrafoComentario.append(parrafo); // muestra el comentario
          // console.log(commentDoc.data().comment);
          // push agrega al array
          arrayQueryComments.push(parrafo);
        });
        // replaceChildren no duplica el comentario
        parrafoComentario.replaceChildren(...arrayQueryComments);
      });
      // se oculta el input
      buttonComment.addEventListener('click', () => {
        inputComments.style.display = 'none';
      });

      // se pintan en interfaz la informacion usando appendChild y append
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
    // se usa replaceChildren para que no se repita el array
    postsSection.replaceChildren(...arraySection);
  });

  // MENÚ ICONOS PIE DE PAGINA
  const menuIcono = document.createElement('section');
  menuIcono.className = 'menuIcono';
  const profileIcono = document.createElement('img'); // menu perfil
  profileIcono.className = 'profileIcono';
  profileIcono.src = profileIconoFeed;
  const addIcono = document.createElement('img'); // suma para hacer post
  addIcono.className = 'addIcono';
  addIcono.src = addIconoFeed;
  const signOut = document.createElement('img'); // icono puerta cerrar sesion
  signOut.className = 'signOut';
  signOut.src = signOutFeed;

  containerFeed.appendChild(menuIcono);
  menuIcono.append(profileIcono, addIcono, signOut);

  // icono perfil nos redirige al profile del usuario
  profileIcono.addEventListener('click', () => {
    onNavigate('/profile');
  });
  // Botón de cerrar sesión
  signOut.addEventListener('click', () => {
    signOutUser()
      .then(() => {
        // console.log(signOutUser(auth));
        onNavigate('/'); // se se cierra sesion nos redirige al home
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
  const suma = document.querySelector('.addIcono'); // se le da funcionalidad al icono +
  addIcono.addEventListener('click', () => {
    modalPost.style.display = 'block';
  });
  // al apretar desaparece el modal
  savePost.addEventListener('click', () => {
    modalPost.style.display = 'none';
  });
  // al apretar save además nos entrega los valores guardando la nueva información
  savePost.addEventListener('click', async () => {
    if (textPost.value) {
      const post = {
        Title: titlePost.value,
        comments: textPost.value,
        // se organiza por fecha en firebase para que el ultimo post sea mostrado de los primeros
        date: new Date(),
        // se obtiene el nombre de usuario de la autenticación
        userName: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        likes: [],
      };
        // subida de imagen en el post
      const postCreated = await addPost(post);
      // guardar la imagen con el id del post
      addPicture(
        buttonPicture.files[0],
        postCreated.id,
        // funcion para actualizar la imagen del post
        (image) => updatePost(postCreated, { image }),
      );
      titlePost.value = '';
      textPost.value = '';
    }
  });
  return containerFeed;
};
