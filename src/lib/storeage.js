import {
    getStorage, ref, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';

// Crear una referencia raíz
const storage = getStorage();

/* // a esta función la invocamos para mostrar el mensaje final después del upload
function mensajeFinalizado(url) {
  const elMensaje = document.getElementById('file-box');
  const textoMensaje = `<img src="${url}" class="preview"> `;
  elMensaje.innerHTML = textoMensaje;
} */

// Create a reference to image
export function addPicture(archivo) {
    const refStoreage = ref(storage, `images/${archivo.name}`);
    /** @type {any} */
    const metadata = { //agregar metadatos de archivos
        contentType: 'image/jpeg',
    };
}

const uploadTask = uploadBytesResumable(refStorage, archivo, metadata);
  console.log(uploadTask);
  uploadTask.on( // supervisa el estado de la carga
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
      // eslint-disable-next-line default-case
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // eslint-disable-next-line default-case
      switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
        // User canceled the upload
          break;

          // ...

        case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log('File available at', url);
        localStorage.setItem('url', url);
       // mensajeFinalizado(url);
      });
    },
  );
};
