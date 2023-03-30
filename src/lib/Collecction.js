import { collection, getFirestore, onSnapshot, addDoc } from 'firebase/firestore';
// import { getStorage, ref } from 'firebase/storage';

/* export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(getFirestore(), 'Posts'));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    console.log(data);
    return data;
  } */

export const onPostsChange = (callback) => onSnapshot(collection(getFirestore(), 'Posts'), callback); // onSnapshot es la función para estar escuchando los cambios de la colección, y el callback es la función que se va a ejecutar cuando hay un cambio en la colección

export const addCommentToPost = (postRef, comment) => addDoc(collection(postRef, 'Comments'), { comment });

export const addPost = (post) => addDoc(collection(getFirestore(), 'Posts'), post);

// Create a root reference
/* const storage = getStorage();

// Create a reference to 'mountains.jpg'
const muro1Ref = ref(storage, 'muro1.png');

// Create a reference to 'images/mountains.jpg'
const muro1ImagesRef = ref(storage, '..imagenes/muro1.png');

// While the file names are the same, the references point to different files
muro1Ref.name === muro1ImagesRef.muro1.png; // true
muro1ImagesRef.fullPath === muro1ImagesRef.fullPath; */
