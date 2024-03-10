// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmnq9WrzZwiTAgfv612FOW8Gv_gbzU0qM",
  authDomain: "micro2-16b3c.firebaseapp.com",
  projectId: "micro2-16b3c",
  storageBucket: "micro2-16b3c.appspot.com",
  messagingSenderId: "319990136059",
  appId: "1:319990136059:web:fa77d3964d56cce7a0c45e",
  measurementId: "G-GJK51SR1PE"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

