// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, push, set } from 'firebase/database';
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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const submitRsvp = async (rsvpData) => {
    const newRsvpKey = push(child(ref(db), 'rsvps')).key;
    console.log(newRsvpKey);
    const updates = {};
    updates['/rsvps/' + newRsvpKey] = rsvpData;
    await set(ref(db), updates);
};

export { db, submitRsvp };