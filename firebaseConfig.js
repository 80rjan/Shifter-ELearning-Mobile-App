// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import Firebase Authentication
import {doc, getDoc, getFirestore, setDoc, updateDoc, deleteDoc} from "firebase/firestore";  // Import Firestore if needed
import { getDownloadURL, getStorage, ref } from "firebase/storage";
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

export const storage = getStorage();

async function getDownloadUrl(filePath) {
    try {
        // Create a reference to the file
        const fileRef = ref(storage, filePath);
        // Get the download URL
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (error) {
        console.error('Error getting download URL:', error);
        return null;
    }
}

//get image from
async function updateCourseWithImage(imageFilePath) {
    try {
        // Get the download URL for the image
        const imageUrl = await getDownloadUrl(imageFilePath);

        if (imageUrl) {
            // Extract the image name from the file path
            const imageName = imageFilePath.split('/').pop().split('.')[0];

            // Reference to the course document
            const courseRef = doc(db, 'courses', imageName);

            // Update the course document with the image URL
            await updateDoc(courseRef, {
                image: imageUrl // Use the field name 'image' or whatever name you prefer
            });

            console.log(`Document ${imageName} updated successfully with image URL.`);
        } else {
            console.error('Failed to get image URL.');
        }
    } catch (error) {
        console.error('Error updating Firestore document:', error);
    }
}

//copy document wit old id into new document with new id
async function changeDocumentId(oldId, newId, collectionName) {
    try {
        // Reference to the old document
        const oldDocRef = doc(db, collectionName, oldId);
        // Get the data from the old document
        const docSnapshot = await getDoc(oldDocRef);

        if (docSnapshot.exists()) {
            // Get the data from the old document
            const data = docSnapshot.data();

            // Create a new document with the new ID and copy the data
            const newDocRef = doc(db, collectionName, newId);
            await setDoc(newDocRef, data);

            // Delete the old document
            await deleteDoc(oldDocRef);

            console.log(`Document ID changed from ${oldId} to ${newId}`);
        } else {
            console.error(`Document with ID ${oldId} does not exist.`);
        }
    } catch (error) {
        console.error('Error changing document ID:', error);
    }
}


// Call the function with the path to your image
updateCourseWithImage('images/personalized onboarding process.jpg');
updateCourseWithImage('images/leadership & management.jpg');
updateCourseWithImage('images/marketing as a flywheel.jpg');
updateCourseWithImage('images/negotiation skills for more sales.jpg');
updateCourseWithImage('images/the go-to marketing strategy.jpg');
