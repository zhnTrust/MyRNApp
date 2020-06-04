import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4W-oUPhepqKPLfZd6TJ90uVGATR-qP3E",
  authDomain: "myrnapp-71a25.firebaseapp.com",
  databaseURL: "https://myrnapp-71a25.firebaseio.com",
  projectId: "myrnapp-71a25",
  storageBucket: "myrnapp-71a25.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
