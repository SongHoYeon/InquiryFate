import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCJYe7I7cU5xvFu9k4OjWmkRydU4KReI5c",
    authDomain: "chouchou-7577f.firebaseapp.com",
    databaseURL: "https://chouchou-7577f-default-rtdb.firebaseio.com",
    projectId: "chouchou-7577f",
    storageBucket: "chouchou-7577f.appspot.com",
    messagingSenderId: "916123365205",
    appId: "1:916123365205:web:e0816e0951e637b8abc9dc",
    measurementId: "G-0MC0BDNKJL"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.firestore().settings({ experimentalForceLongPolling: true });

export default firebase;