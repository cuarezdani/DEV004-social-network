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

// inicializamos firebase
export const app = initializeApp(firebaseConfig);

// inicializamos Cloud Firestore para tener referencias al servicio para que la
// app interactúe con el tenido y los recursos del proyecto
export const db = getFirestore(app);

// se inicializa Firebase Authentication y obtenemos una referencia al servicio
// se usa para autentificar varios metodos de acceso con correo, email y contraseña
export const auth = getAuth(app);
// usamos ademas Google para enlazarlos a nuestra base de datos
export const provider = new GoogleAuthProvider();

export const initFirebase = () => ({
  app,
  auth,
  db,
  provider,
});
