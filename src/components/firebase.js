import firebase from 'firebase/compat/app';
import 'firebase/compat/database';    // for realtime database

const firebaseConfig = {
    apiKey: "AIzaSyAuLTQUlmUjXP1zw6LPYAVAC36qzMqHOEw",
    authDomain: "scinews-59fbd.firebaseapp.com",
    databaseURL: "https://scinews-59fbd-default-rtdb.firebaseio.com",
    projectId: "scinews-59fbd",
    storageBucket: "scinews-59fbd.appspot.com",
    messagingSenderId: "399146358601",
    appId: "1:399146358601:web:ad94ef245ed47531f06c98"
  };
  
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export default firebase;