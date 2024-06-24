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

    // Define the collection and document data
    const rsvpCollection = collection(db, 'rsvps');


    // Add the document to the collection
    const newDocRef = await addDoc(rsvpCollection, rsvpData);

    // Log the document ID
    console.log('New document added with ID:', newDocRef.id);

};

export { db, submitRsvp };