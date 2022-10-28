import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDtr9PdL9GSyR6LjtOhuX-3W0-R6vhb4h0',
  authDomain: 'react-http-853e8.firebaseapp.com',
  databaseURL: 'https://react-http-853e8-default-rtdb.firebaseio.com',
  projectId: 'react-http-853e8',
  storageBucket: 'react-http-853e8.appspot.com',
  messagingSenderId: '82034017686',
  appId: '1:82034017686:web:8b4cdf2fb0202f815e09b7',
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
