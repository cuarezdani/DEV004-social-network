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

export const onPostsChange = (callback) => onSnapshot(query(collection(getFirestore(), 'Posts'), orderBy('date', 'desc')), callback); // onSnapshot es la función para estar escuchando los cambios de la colección, y el callback es la función que se va a ejecutar cuando hay un cambio en la colección

export const addCommentToPost = (postRef, comment) => addDoc(collection(postRef, 'Comments'), { comment, date: new Date() }); // crea el comentario para post y le da fecha
export const addPost = (post) => addDoc(collection(getFirestore(), 'Posts'), post); // crea el post

export const deletePost = (docRef) => deleteDoc(doc(getFirestore(), 'Posts', docRef)); // borrar post

export const getComments = (docRef, callback) => onSnapshot(query(collection(docRef, 'Comments'), orderBy('date', 'desc')), callback); // recorre array de comentarios y se muestra en interfaz, y lo ordena por fecha

export const updatePost = (docRef, data) => updateDoc(docRef, data); // crea documento de Likes

export const saveUser = (user) => addDoc(collection(getFirestore(), 'Users'), user); // crea los usuarios en el firebase con la autenticación

// Obtiene la información de los post
// export const getPost = (id) => getDoc(doc(getFirestore(), 'Posts', id)); no ocupado

export const sumLike = (id, user) => updateDoc(doc(getFirestore(), 'Posts', id), {
  likes: arrayUnion(user),
});

export const removeLike = (id, user) => updateDoc(doc(getFirestore(), 'Posts', id), {
  likes: arrayRemove(user),
});

// export const storage = firebase.storage();

// Create a root reference
/* const storage = getStorage();

// Create a reference to 'mountains.jpg'
const muro1Ref = ref(storage, 'muro1.png');

// Create a reference to 'images/mountains.jpg'
const muro1ImagesRef = ref(storage, '..imagenes/muro1.png');

// While the file names are the same, the references point to different files
muro1Ref.name === muro1ImagesRef.muro1.png; // true
muro1ImagesRef.fullPath === muro1ImagesRef.fullPath; */
