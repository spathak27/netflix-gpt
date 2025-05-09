// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKu6DUV1senbWrS9XN-6wOVj7oY38omS8",
  authDomain: "netflixgpt-13ac0.firebaseapp.com",
  projectId: "netflixgpt-13ac0",
  storageBucket: "netflixgpt-13ac0.firebasestorage.app",
  messagingSenderId: "405271906190",
  appId: "1:405271906190:web:ddaadaaf4c6fcd9c7946df",
  measurementId: "G-ZMFR9EXZ6E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
