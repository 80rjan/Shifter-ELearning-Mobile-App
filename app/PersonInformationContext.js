import React, { createContext, useState, useContext } from 'react';

const PersonInformationContext = createContext();

export function PersonProvider({ children }) {
    const [coursesBought, setCoursesBought] = useState([]);
    const [coursesFavorite, setCoursesFavorite] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null); // Add profile picture state

    function addCourse(courseToAdd) {
        const courseAlreadyBought = coursesBought.some(boughtCourse => boughtCourse.title === courseToAdd.title);
        if (!courseAlreadyBought) {
            const updatedCourse = { ...courseToAdd, bought: true };
            setCoursesBought(prevCourses => [...prevCourses, updatedCourse]);
        }
    }

    function addFavorites(courseToAdd) {
        const courseAlreadyFavorite = coursesFavorite.some(favoriteCourse => favoriteCourse.title === courseToAdd.title);
        if (!courseAlreadyFavorite) {
            const updatedCourse = { ...courseToAdd, favorite: true };
            setCoursesFavorite(prevFavorites => [...prevFavorites, updatedCourse]);
        }
    }

    function removeFavorites(courseToRemove) {
        setCoursesFavorite(prevFavorites =>
            prevFavorites.filter(favoriteCourse => favoriteCourse.title !== courseToRemove.title)
        );
    }

    function updateProfilePicture(uri) {
        setProfilePicture(uri); // Update profile picture in context
    }

    const pointsAchieved = coursesBought.reduce((sum, course) => sum + (course.points || 0), 0);

    const allSkills = coursesBought.flatMap(course => course.skills || []);
    const skillsSet = new Set(allSkills);
    const skills = Array.from(skillsSet);

    const person = {
        name: 'Borjan Gjorgjievski',
        job: 'Software Engineer',
        email: 'borjangjorgjievski1@gmail.com',
        profilePicture, // Add profile picture to the person object
        coursesBought,
        coursesFavorite,
        coursesLength: coursesBought.length,
        points: pointsAchieved,
        skills,
        skillsLength: skills.length
    };

    return (
        <PersonInformationContext.Provider value={{ person, addCourse, addFavorites, removeFavorites, updateProfilePicture }}>
            {children}
        </PersonInformationContext.Provider>
    );
}

export function usePerson() {
    return useContext(PersonInformationContext);
}
