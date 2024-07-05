// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
//librería que permite utilizar funciones
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN:
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATAnimrw-oxKSwLmGqgrw62zP9d89PwTU",
    authDomain: "administracion-85f44.firebaseapp.com",
    projectId: "administracion-85f44",
    storageBucket: "administracion-85f44.appspot.com",
    messagingSenderId: "709260414464",
    appId: "1:709260414464:web:25a60724f7238b8793d2e5",
    measurementId: "G-8LMCSPYKJS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//función de firestore que retorna la base de datos para ser utilizada
const db = getFirestore(app);

export const save = (emp) => {
    //addDoc es una función de firestore que permite añadir un nuevo documento a la colección 
    //collection es una función de firestore que permite recibir la base de datos y el nombre de la colección
    addDoc(collection(db, 'Proveedores'), emp)
}
//función para listar todos los registros
export const getData = (data) => {
    //onSnapshot es la función que permite retornar la colección y asignarla a una variable
    onSnapshot(collection(db, 'Proveedores'), data)
}

//función eliminar 
export const eliminar = (id) =>{
    //deleteDoc es la función de firestore que permite eliminar un documento por su id
    //doc es la función que permite buscar el documento por su id 
    deleteDoc(doc(db,'Proveedores',id))
}

//getDoc obtener un documento, porque debe esperar a traer el resultado  
export const obtener = (id) => getDoc(doc(db,'Proveedores',id))

//función para actualizar los datos del documento 
export const update = (id,Proveedores) =>{
    //updateDoc es una función de firestore permite modificar un documento seleccionado 
    updateDoc(doc(db,'Proveedores',id),Proveedores)
}
