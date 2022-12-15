// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCiKEf6TUXiUWmIS5TF1DbA5vJVw4sBfXc",
  authDomain: "se-esa-11f8d.firebaseapp.com",
  projectId: "se-esa-11f8d",
  storageBucket: "se-esa-11f8d.appspot.com",
  messagingSenderId: "246227322237",
  appId: "1:246227322237:web:22a8d055f16a84e446b814"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()