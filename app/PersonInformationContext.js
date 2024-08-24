import React, { createContext, useState, useContext, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebaseConfig';

const PersonInformationContext = createContext();

export function PersonProvider({ children }) {
    const defaultUserState = {
        name: '',
        jobTitle: '',
        company: '',
        email: '',
        coursesBought: [],
        coursesFavorite: [],
        profilePicture: null,
        points: 0,
        skills: []
    };
    const [user, setUser] = useState(defaultUserState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function fetchUserData(userId) {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser(userData); // Ensure this sets the complete user data
            } else {
                console.log('No such document! Setting default user data.');
                await setDoc(doc(db, 'users', userId), defaultUserState); // Set default user state
                setUser(defaultUserState); // Update local state
            }
        } catch (err) {
            console.error('Error fetching user data from Firestore: ', err);
            setError('Failed to load user data.');
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
                error,
                changeUserDetails,
                addFavorites,
                removeFavorites,
                addCourse,
                updateProfilePicture,
            }}
        >
            {children}
        </PersonInformationContext.Provider>
    );
}

export function usePerson() {
    return useContext(PersonInformationContext);
}
