  import  firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'
  import 'firebase/storage'
  
  
  
  const firebaseConfig = {
    apiKey: "AIzaSyDKY3Qs_s6lMT94Id3BUUvhh0V6zB7TmMg",
    authDomain: "pruebas-25635.firebaseapp.com",
    projectId: "pruebas-25635",
    storageBucket: "pruebas-25635.appspot.com",
    messagingSenderId: "641425608809",
    appId: "1:641425608809:web:c315a1cd4fc1dcfe1b92f8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore()
  let storage = firebase.storage()

  export {
      db ,
      storage
  }