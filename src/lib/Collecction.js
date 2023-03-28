import { collection, getFirestore, onSnapshot } from 'firebase/firestore';

/* export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(getFirestore(), 'Posts'));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    console.log(data);
    return data;
  } */

export const onPostsChange = (callback) => onSnapshot(collection(getFirestore(), 'Posts'), callback); // onSnapshot es la función para estar escuchando los cambios de la colección, y el callback es la función que se va a ejecutar cuando hay un cambio en la colección

/* export const docRef = (Comments) => addDoc(collection(getFirestore, 'Comments'), {
  Comments,
  user: '',
  comments: '',
  id: auth.currentUser.uid,
  likes,
}); */

// Add a new document with a generated id.

  /* export const createComments = addDoc(collection(getFirestore, 'Comments'), {
    user: '',
    comments: '',
  });
console.log('Document written with ID: ', docRef.id);
}; */