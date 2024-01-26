// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnUU9YFUZwSDvZxjQaBtgNEcJsxluhqK4",
  authDomain: "todo-90d4f.firebaseapp.com",
  projectId: "todo-90d4f",
  storageBucket: "todo-90d4f.appspot.com",
  messagingSenderId: "1005752487320",
  appId: "1:1005752487320:web:a5015432a5bfd551a9efed"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);