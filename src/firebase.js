// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_713tc8GL4hzclSaL9wf-T07In-OotPQ",
  authDomain: "groceries-9a151.firebaseapp.com",
  projectId: "groceries-9a151",
  storageBucket: "groceries-9a151.appspot.com",
  messagingSenderId: "103614512848",
  appId: "1:103614512848:web:991b3acf6496540894e8d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
