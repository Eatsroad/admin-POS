import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
const firebaseConfig = {
//
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const storage = firebase.storage();
