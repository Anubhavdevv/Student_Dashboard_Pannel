import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "studentdatabase-d7899.firebaseapp.com",
  projectId: "studentdatabase-d7899",
  storageBucket: "studentdatabase-d7899.appspot.com",
  messagingSenderId: "41340390217",
  appId: "1:41340390217:web:01ba33843d9fe32c1fe898"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
