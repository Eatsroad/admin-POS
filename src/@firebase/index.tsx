import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyBDhV4bO0tjwnYFtmRZLn1tI7Rkbb1g__U',
  authDomain: 'eatsroad-bb1ef.firebaseapp.com',
  projectId: 'eatsroad-bb1ef',
  storageBucket: 'eatsroad-bb1ef.appspot.com',
  messagingSenderId: '893303016474',
  appId: '1:893303016474:web:e4635fff5b0c8bcdde55a3',
  measurementId: 'G-RCF645285L',
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
