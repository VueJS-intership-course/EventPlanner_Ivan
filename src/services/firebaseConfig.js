// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfLROt6LRWnLn87cLEiNW5ATyyOpBIorE",
  authDomain: "eventplanner-ivan.firebaseapp.com",
  databaseURL: "https://eventplanner-ivan-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eventplanner-ivan",
  storageBucket: "eventplanner-ivan.appspot.com",
  messagingSenderId: "368184162127",
  appId: "1:368184162127:web:8708afa24c652d55fc773a",
  measurementId: "G-3PKT8KC0S2",
};

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const fireAuth = firebase.auth();

const firebaseData = {
  fireStore,
  fireAuth,
};

export default firebaseData;
