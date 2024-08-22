// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import Firebase Authentication
import { getFirestore } from "firebase/firestore";  // Import Firestore if needed
// You can import other Firebase products as needed, like Firestore, Storage, etc.

// Your web app's Firebase configuration (from your project settings)
const firebaseConfig = {
    apiKey: "AIzaSyBvULx9NsKcxQxm5m54uOjtChdhYzc43Ag",
    authDomain: "shifterapp-2173851.firebaseapp.com",
    projectId: "shifterapp-2173851",
    storageBucket: "shifterapp-2173851.appspot.com",
    messagingSenderId: "650830706441",
    appId: "1:650830706441:web:eb785acdc415a2ea6ac5d8",
    measurementId: "G-79218269XW"  // This can be omitted if not needed
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Optionally, initialize Firestore and export it
export const db = getFirestore(app);
