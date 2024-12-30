// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWZBrsG5N67p9KaqNVXOTObWfXQ4_I_vQ",
  authDomain: "bicechat.firebaseapp.com",
  projectId: "bicechat",
  storageBucket: "bicechat.appspot.com",
  messagingSenderId: "1087012654985",
  appId: "1:1087012654985:web:d9cfb02438c97b3a579b58",
  measurementId: "G-34BBW993T5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the app to use it in other files
export { app };
