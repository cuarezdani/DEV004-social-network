import { collection, getDocs, getFirestore } from 'firebase/firestore';

export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(getFirestore(), 'Posts'));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    console.log(data);
    return data;
  });
};
