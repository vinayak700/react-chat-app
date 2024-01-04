import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_2TWWNyeb2jKk9BnfuCuxjJ23gGtA8z4",
  authDomain: "react-chat-app-94bad.firebaseapp.com",
  projectId: "react-chat-app-94bad",
  storageBucket: "react-chat-app-94bad.appspot.com",
  messagingSenderId: "727468272752",
  appId: "1:727468272752:web:227d41fc200aff044d58b5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
