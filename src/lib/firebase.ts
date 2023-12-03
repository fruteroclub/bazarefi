// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseApiKey = process.env.FIREBASE_API_KEY ?? "";
console.log(firebaseApiKey);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "bazarefi.firebaseapp.com",
  projectId: "bazarefi",
  storageBucket: "bazarefi.appspot.com",
  messagingSenderId: "41788611821",
  appId: "1:41788611821:web:303ccfdac52c66622780e4",
  measurementId: "G-9QXLG33C3J",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

export const initializeFirebase = () => {
  initializeApp(firebaseConfig);
};

export const storage = getStorage(firebase);
