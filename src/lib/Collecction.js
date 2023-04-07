import {
  collection,
  getFirestore,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  setDoc,
} from 'firebase/firestore';
// import { getStorage, ref } from 'firebase/storage';

/* export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(getFirestore(), 'Posts'));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    console.log(data);
    return data;
  } */

export const onPostsChange = (callback) => onSnapshot(query(collection(getFirestore(), 'Posts'), orderBy('date', 'desc')), callback); // onSnapshot es la función para estar escuchando los cambios de la colección, y el callback es la función que se va a ejecutar cuando hay un cambio en la colección

export const addCommentToPost = (postRef, comment) => addDoc(collection(postRef, 'Comments'), { comment, date: new Date() });

export const addPost = (post) => addDoc(collection(getFirestore(), 'Posts'), post);

export const deletePost = (docRef) => deleteDoc(docRef);

export const getComments = (docRef, callback) => onSnapshot(query(collection(docRef, 'Comments'), orderBy('date', 'desc')), callback);

export const updatePost = (docRef, comments) => updateDoc(docRef, comments);

export const saveUser = (user) => addDoc(collection(getFirestore(), 'Users'), user);

// Create a root reference
/* const storage = getStorage();

// Create a reference to 'mountains.jpg'
const muro1Ref = ref(storage, 'muro1.png');

// Create a reference to 'images/mountains.jpg'
const muro1ImagesRef = ref(storage, '..imagenes/muro1.png');

// While the file names are the same, the references point to different files
muro1Ref.name === muro1ImagesRef.muro1.png; // true
muro1ImagesRef.fullPath === muro1ImagesRef.fullPath; */
