 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
  apiKey: "AIzaSyC4hM5aAhXnmuUX8YGaI0-sInT8WhM2o2A",
  authDomain: "chat-e961a.firebaseapp.com",
  projectId: "chat-e961a",
  storageBucket: "chat-e961a.appspot.com",
  messagingSenderId: "298326086716",
  appId: "1:298326086716:web:3119b989c43f87ace6df39"
};
 
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();