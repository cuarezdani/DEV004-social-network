// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCwlm3jH5W3WcbvJTX9JoWcxCTPYVKUrEw',
  authDomain: 'coffee-hour-9b779.firebaseapp.com',
  projectId: 'coffee-hour-9b779',
  storageBucket: 'coffee-hour-9b779.appspot.com',
  messagingSenderId: '1039410541481',
  appId: '1:1039410541481:web:90c0f8f334504bcd5e0ab8',
  measurementId: 'G-FGEFCNDPJQ',
};

export const initFirebase = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  return {
    app,
    auth,
    db,
    provider,
  };
};
// const analytics = getAnalytics(app);
