import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCVMHTo4VC2GpRAw0Tt65T-A058ki9JmHI",
  authDomain: "todo-app-cp-2270a.firebaseapp.com",
  databaseURL: "https://todo-app-cp-2270a.firebaseio.com",
  projectId: "todo-app-cp-2270a",
  storageBucket: "todo-app-cp-2270a.appspot.com",
  messagingSenderId: "461948659517",
  appId: "1:461948659517:web:d29147630b7819a4df4754",
  measurementId: "G-DQXL5RPFP8"
});

const db = firebaseApp.firestore();

export default db;