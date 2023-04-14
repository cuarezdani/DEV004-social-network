// import { getStorage, ref } from 'firebase/storage';
import {
  collection,
  getFirestore,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

// onSnapshot es la función para escuchar los cambios de la colección, y el callback es la función
// que se va a ejecutar cuando hay un cambio en la colección. Además se ordena por fecha desc
export const onPostsChange = (callback) => onSnapshot(query(collection(getFirestore(), 'Posts'), orderBy('date', 'desc')), callback);

// crea el comentario para post y le da fecha tambien
export const addCommentToPost = (postRef, comment) => addDoc(collection(postRef, 'Comments'), { comment, date: new Date() });

// creamos el post con addPost
export const addPost = (post) => addDoc(collection(getFirestore(), 'Posts'), post);

// borrar post
export const deletePost = (docRef) => deleteDoc(doc(getFirestore(), 'Posts', docRef));

// recorre array de comentarios y se muestra en interfaz, y lo ordena por fecha
export const getComments = (docRef, callback) => onSnapshot(query(collection(docRef, 'Comments'), orderBy('date', 'desc')), callback);

// crea documento de Likes
export const updatePost = (docRef, data) => updateDoc(docRef, data);

// crea los usuarios en el firebase con la autenticación
export const saveUser = (user) => addDoc(collection(getFirestore(), 'Users'), user);

// Obtiene la información de los post
// export const getPost = (id) => getDoc(doc(getFirestore(), 'Posts', id)); no ocupado

// sumamos y restados los likes dados por el usuario autentificado
export const sumLike = (id, user) => updateDoc(doc(getFirestore(), 'Posts', id), {
  likes: arrayUnion(user),
});

export const removeLike = (id, user) => updateDoc(doc(getFirestore(), 'Posts', id), {
  likes: arrayRemove(user),
});
