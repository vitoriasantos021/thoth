// configuração do bando de dados, de acordo com a documentação
// o banco esta na versão 8.10.1, uma versão mais facil de se ultilizar

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

// constante com as informações criada no banco de dados
const firebaseConfig = {
    apiKey: "AIzaSyDDPPgxnDPc1wXj3ZZ7YsjeaC0feIZlhJ4",
    authDomain: "thoth-25fce.firebaseapp.com",
    // databaseURL: "https://thoth-25fce-default-rtdb.firebaseio.com",
    projectId: "thoth-25fce",
    storageBucket: "thoth-25fce.appspot.com",
    messagingSenderId: "1012402418470",
    appId: "1:1012402418470:web:41a9eee0ea58221158c7e7",
    measurementId: "G-0GNVW3R9TJ"
};
  
// Inicializar o Firebase

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

// exporta toda a configuração para ser ultilizada no projeto
export { firebase as default }
