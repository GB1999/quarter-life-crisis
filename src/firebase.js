// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQhqAiO2_xDnNhWepTWy-Fqr7mi3bAsOM",
    authDomain: "quarter-life-crisis-c0e7f.firebaseapp.com",
    databaseURL: "https://quarter-life-crisis-c0e7f-default-rtdb.firebaseio.com",
    projectId: "quarter-life-crisis-c0e7f",
    storageBucket: "quarter-life-crisis-c0e7f.appspot.com",
    messagingSenderId: "1034097337812",
    appId: "1:1034097337812:web:52208095cfe7591f9fa241",
    measurementId: "G-PLCQ0YEPT1"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();

export { db };