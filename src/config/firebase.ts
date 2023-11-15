import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy4YTL88iaMXy2ApBKqlj2FwjYEWBilCk",
  authDomain: "ga-project2-e02eb.firebaseapp.com",
  projectId: "ga-project2-e02eb",
  storageBucket: "ga-project2-e02eb.appspot.com",
  messagingSenderId: "501261836425",
  appId: "1:501261836425:web:b2d95d23d6d615b581a658",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
export const auth = getAuth();
