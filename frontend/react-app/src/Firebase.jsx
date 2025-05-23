import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBovKJXqhIFcTbrJEF2V6esEmn-7neRq1c",
  authDomain: "nextbook-8e06a.firebaseapp.com",
  projectId: "nextbook-8e06a",
  storageBucket: "nextbook-8e06a.firebasestorage.app",
  messagingSenderId: "24760970296",
  appId: "1:24760970296:web:7e48480c01f8a50c514acd",
  measurementId: "G-KLNF9F5CN5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default app;
export {auth};
export {provider};