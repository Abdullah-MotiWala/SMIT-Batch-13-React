import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
console.log(import.meta.env.VITE_FIREBASE_API_KEY, "===key");
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ticketmanagementsystem-86e87.firebaseapp.com",
  projectId: "ticketmanagementsystem-86e87",
  storageBucket: "ticketmanagementsystem-86e87.firebasestorage.app",
  messagingSenderId: "495483048951",
  appId: "1:495483048951:web:6eb63d4f1de8c70da354f2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
