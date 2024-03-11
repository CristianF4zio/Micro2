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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
