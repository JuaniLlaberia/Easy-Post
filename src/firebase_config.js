import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC9vFuICNQL9tUcE3hzIVNpfcfJfJKCl20",
  authDomain: "jobs-search-app.firebaseapp.com",
  projectId: "jobs-search-app",
  storageBucket: "jobs-search-app.appspot.com",
  messagingSenderId: "453628561493",
  appId: "1:453628561493:web:86976d9c046363cb172cdc"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);