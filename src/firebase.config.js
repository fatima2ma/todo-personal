// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8dB919yMQV6U31-Eo2bktFazUtoCUtbU",
  authDomain: "todo-personal-9eb25.firebaseapp.com",
  projectId: "todo-personal-9eb25",
  storageBucket: "todo-personal-9eb25.appspot.com",
  messagingSenderId: "210639340678",
  appId: "1:210639340678:web:fc4292f3a92ce918bcfd07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();