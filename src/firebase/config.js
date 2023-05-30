import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzRKSNqBl0b5KqsSoY9RImqO7g1jNHFls",
  authDomain: "test-7d898.firebaseapp.com",
  projectId: "test-7d898",
  storageBucket: "test-7d898.appspot.com",
  messagingSenderId: "440434422220",
  appId: "1:440434422220:web:fd8fd93fd818e0cf7ded69",
};

// init Firebase

firebase.initializeApp(firebaseConfig);

// init services

export const projectFirestore = firebase.firestore();
