import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-1a4f9.firebaseapp.com",
  projectId: "twitter-clone-1a4f9",
  storageBucket: "twitter-clone-1a4f9.appspot.com",
  messagingSenderId: "810735139230",
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
