// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "techblog-fcea9.firebaseapp.com",
  projectId: "techblog-fcea9",
  storageBucket: "techblog-fcea9.appspot.com",
  messagingSenderId: "386696148210",
  appId: "1:386696148210:web:017ea02abcab1567d50c6b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

