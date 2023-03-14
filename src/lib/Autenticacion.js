/* eslint-disable import/no-extraneous-dependencies */
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword,
} from 'firebase/auth';

// Para crear una cuenta nueva, pasa la dirección de correo electrónico y la contraseña del usuario nuevo
export const registerWithEmail = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      alert('Register Accepted');
      window.location.href = '/login'; // pendiente redirigir al perfil
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      alert('Please Try Again');
      window.location.href = '/register'; // pendiente redirigir al Home
    });
};

export const signInWithPassword = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      console.log(token);
      console.log(user);

      alert('auth ok');
      window.location.href = '/login';
      // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert('auth error');
      window.location.href = '/';
      // ...
    });
};
