import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC35Z7zmEmxOpWRZjcJ9TqRmDH3mGp4jP4",
  authDomain: "interview-project-2bad7.firebaseapp.com",
  projectId: "interview-project-2bad7",
  storageBucket: "interview-project-2bad7.appspot.com",
  messagingSenderId: "932730832723",
  appId: "1:932730832723:web:b5d1584705fa8228ac43a6",
  measurementId: "G-E4V1XB8TBJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
