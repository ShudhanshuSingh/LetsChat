import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC2MC5WJtIwxkI5Y7wilgx5h3ehuTQAtiI",
    authDomain: "facebook-messenger-clone-651ef.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-651ef.firebaseio.com",
    projectId: "facebook-messenger-clone-651ef",
    storageBucket: "facebook-messenger-clone-651ef.appspot.com",
    messagingSenderId: "653737497774",
    appId: "1:653737497774:web:2f3b3180e91eb73d06893f",
    measurementId: "G-FE945Z2W2D"
}) 

const db = firebaseApp.firestore();
export default db;


// const firebaseConfig = {
//     apiKey: "AIzaSyC2MC5WJtIwxkI5Y7wilgx5h3ehuTQAtiI",
//     authDomain: "facebook-messenger-clone-651ef.firebaseapp.com",
//     databaseURL: "https://facebook-messenger-clone-651ef.firebaseio.com",
//     projectId: "facebook-messenger-clone-651ef",
//     storageBucket: "facebook-messenger-clone-651ef.appspot.com",
//     messagingSenderId: "653737497774",
//     appId: "1:653737497774:web:2f3b3180e91eb73d06893f",
//     measurementId: "G-FE945Z2W2D"
//   };

