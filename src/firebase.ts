// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEx_N5u9fH6Kb9anp23kUja2hyHRQHzeE",
  authDomain: "my-notes-df7c5.firebaseapp.com",
  projectId: "my-notes-df7c5",
  storageBucket: "my-notes-df7c5.appspot.com",
  messagingSenderId: "539805789654",
  appId: "1:539805789654:web:90486185f21791bb9e4877",
  measurementId: "G-KBQZ2QP9BJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);