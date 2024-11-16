// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "best-oath-mern.firebaseapp.com",
  projectId: "best-oath-mern",
  storageBucket: "best-oath-mern.appspot.com",
  messagingSenderId: "281168048051",
  appId: "1:281168048051:web:312d118a72325698b765c6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);