import {
  getStorage, ref, uploadBytesResumable,
} from 'firebase/storage';

// Crear una referencia raíz
const storage = getStorage();

/* // a esta función la invocamos para mostrar el mensaje final después del upload
function mensajeFinalizado(url) {
  const elMensaje = document.getElementById('file-box');
  const textoMensaje = `<img src="${url}" class="preview"> `;
  elMensaje.innerHTML = textoMensaje;
} */

// se crea referencia a la imagen
export function addPicture(archivo, idPost, updatePostImage) {
  const refStorage = ref(storage, `images/${idPost}`);
  /** @type {any} */
  // agregar metadatos de archivos, metadata contiene propiedades
  // como contentType, name, size.
  const metadata = {
    contentType: 'image/jpeg',
  };

  // se sube la metadata del objeto 'image'
  const uploadTask = uploadBytesResumable(refStorage, archivo, metadata);
  console.log(uploadTask);
  uploadTask.on( // supervisa el estado de la carga
    'state_changed',
    (snapshot) => {
      // se obtiene el progreso del proceso
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
          // el ususario no tiene permiso para acceder a este objeto
          break;
        case 'storage/canceled':
          // usuario ha cancelado la carga
          break;

        // ...
        case 'storage/unknown':
          // error desconocido, inspeccionar con error.serverResponse
          break;
      }
    },
    // actualiza la imagen en la coleccion post y refresca la lista (post)
    () => updatePostImage(uploadTask.snapshot.ref.fullPath),
  );
}
