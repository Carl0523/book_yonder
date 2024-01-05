// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "book-yonder.firebaseapp.com",
  projectId: "book-yonder",
  storageBucket: "book-yonder.appspot.com",
  messagingSenderId: "258175724604",
  appId: "1:258175724604:web:213b3b3af957cda30f6739"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);