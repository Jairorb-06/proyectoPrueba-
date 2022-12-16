// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWudIIjROFEt0jh9dne0VmtELE6bNi5Yo",
  authDomain: "novoos-club.firebaseapp.com",
  projectId: "novoos-club",
  storageBucket: "novoos-club.appspot.com",
  messagingSenderId: "986692707377",
  appId: "1:986692707377:web:fb5dc3f67a03f7b4c06110",
  measurementId: "G-JD4M9V5FDJ"
};

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);


   const firebaseApp = firebase.initializeApp(firebaseConfig)

   export const db = getFirestore(firebaseApp);
  //  const auth = firebase.auth()
  //  export { auth }