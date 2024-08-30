import React, { createContext, useState, useContext, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {auth, db} from '../firebaseConfig';
import {Alert, useColorScheme} from "react-native";

const PersonInformationContext = createContext();
const isAnonymous = auth.currentUser?.isAnonymous;

export function PersonProvider({ children }) {
    const defaultUserState = {
        name: 'Guest',
        jobTitle: '',
        company: '',
        email: 'guest@example.com',
        coursesBought: [],
        coursesFavorite: [],
        profilePicture: null,
        points: 0,
        skills: []
    };
    const deviceTheme = useColorScheme();
    const [user, setUser] = useState(defaultUserState);
    const [hasAccount, setHasAccount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [lightTheme, setLightTheme] = useState(deviceTheme==='light');
    const lightBackground = '#eee';
    const textLightBackground = '#202020';
    const darkBackground = '#222';
    const textDarkBackground = '#f8f8f8';

    useEffect(() => {
        setLightTheme(deviceTheme === 'light');
    }, [deviceTheme]);

    // const fetchCourses = async () => {
    //     try {
    //         // Reference to your 'courses' collection
    //         const coursesCollection = collection(db, 'courses');
    //         // Get all documents from the collection
    //         const courseSnapshot = await getDocs(coursesCollection);
    //         // Map through the documents and extract the data
    //         const coursesList = courseSnapshot.docs.map(doc => ({
    //             id: doc.id,  // Include document ID if needed
    //             ...doc.data()  // Spread the document data
    //         }));
    //         // Update the state with the fetched courses
    //         setAllCourses(coursesList);
    //         console.log('All courses: ',allCourses);
    //     } catch (error) {
    //         console.error('Error fetching courses:', error);
    //     }
    // };
    // fetchCourses();

    async function fetchUserData(userId) {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser(userData);
            }
            else {
                setUser(defaultUserState);
            }
        } catch (err) {
            console.error('Error fetching user data from Firestore: ', err);
            setError('Failed to load user data.');
            //Remove alert when publishing
            Alert.alert('Error', `Error fetching user data from Firestore: ${err.message}`);
            setUser(defaultUserState);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchUserData(user.uid);
            } else {
                setLoading(false); // No user ID, so no data to fetch
            }
        });
        return unsubscribe; // Cleanup on unmount
    }, []);

    function changeUserDetails(newDetails) {
        setUser(prevUser => ({
            ...prevUser,
            ...newDetails
        }));
        saveUserToFirestore(newDetails); // Save changes immediately
    }

    async function saveUserToFirestore(updatedData) {
        try {
            const auth = getAuth();
            const userId = auth.currentUser?.uid;
            if (userId) {
                await setDoc(doc(db, 'users', userId), updatedData, { merge: true });
            }
        } catch (error) {
            console.error('Error saving user data to Firestore: ', error);
            //Remove alert when publishing
            Alert.alert('Error', `Error saving user data from Firestore: ${error}`);
        }
    }

    async function addFavorites(course) {
        // Update coursesFavorite array
        setUser(prevUser => ({
            ...prevUser,
            coursesFavorite: [...prevUser.coursesFavorite, course]
        }));
        await updateUserInFirestore({ coursesFavorite: [...user.coursesFavorite, course] });
    }

    async function removeFavorites(course) {
        // Filter out the course from the favorites
        const updatedFavorites = user.coursesFavorite.filter(fav => fav.title !== course.title);
        setUser(prevUser => ({
            ...prevUser,
            coursesFavorite: updatedFavorites
        }));
        await updateUserInFirestore({ coursesFavorite: updatedFavorites });
    }

    async function addCourse(course) {
        // Remove from favorites if it exists
        await removeFavorites(course);

        // Update coursesBought array
        const updatedCourses = [...user.coursesBought, course];
        const updatedPoints = user.points + (course.points || 0);
        const updatedSkills = Array.from(new Set([...user.skills, ...course.skills]));

        // Update user state and Firestore
        setUser(prevUser => ({
            ...prevUser,
            coursesBought: updatedCourses,
            points: updatedPoints,
            skills: updatedSkills
        }));

        await updateUserInFirestore({
            coursesBought: updatedCourses,
            points: updatedPoints,
            skills: updatedSkills
        });
    }

    async function updateProfilePicture(newProfilePictureUri) {
        try {
            const auth = getAuth();
            const userId = auth.currentUser?.uid;

            if (userId) {
                // Update the profile picture in Firestore
                await updateDoc(doc(db, 'users', userId), { profilePicture: newProfilePictureUri });

                // Update the local user state
                setUser(prevUser => ({
                    ...prevUser,
                    profilePicture: newProfilePictureUri,
                }));
            }
        } catch (error) {
            console.error('Error updating profile picture in Firestore: ', error);
        }
    }

    async function updateUserInFirestore(updates) {
        if (isAnonymous) return;

        try {
            const auth = getAuth();
            const userId = auth.currentUser?.uid;
            if (userId) {
                await updateDoc(doc(db, 'users', userId), updates);
            }
        } catch (error) {
            console.error('Error updating user data in Firestore: ', error);
        }
    }

    return (
        <PersonInformationContext.Provider
            value={{
                user,
                loading,
                setLoading,
                error,
                lightTheme,
                setLightTheme,
                lightBackground,
                textLightBackground,
                darkBackground,
                textDarkBackground,
                fetchUserData,
                changeUserDetails,
                addFavorites,
                removeFavorites,
                addCourse,
                updateProfilePicture,
                hasAccount,
                setHasAccount,
            }}
        >
            {children}
        </PersonInformationContext.Provider>
    );
}

export function usePerson() {
    return useContext(PersonInformationContext);
}
