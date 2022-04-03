// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD67pAVDdD6OdZp5syaz6-nVhF8b9l19I4",
  authDomain: "cabins-marketplace-app.firebaseapp.com",
  projectId: "cabins-marketplace-app",
  storageBucket: "cabins-marketplace-app.appspot.com",
  messagingSenderId: "765539931892",
  appId: "1:765539931892:web:e5fc5edfec6aa11e69b0a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
