import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { usePerson } from '../PersonInformationContext'; // Import the context hook
import Header from "../elements/Header";
import Topics from "../elements/Topics";
import Courses from "../elements/Courses";
import LoadingScreen from "./LoadingScreen";
import {auth} from "../../firebaseConfig";

export default function Learn({ navigation }) {
    const { user, loading, error, lightTheme, lightBackground, darkBackground } = usePerson(); // Use the context hook to get person data
    const [filteredCourses, setFilteredCourses] = useState(user.coursesBought);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const isAnonymous = auth.currentUser?.isAnonymous;

    useEffect(() => {
        setFilteredCourses(user.coursesBought);
    }, [user.coursesBought])


    const handleFilter = (skill) => {
        if (selectedSkill === skill) {
            // If the skill is already selected, clear the filter
            setFilteredCourses(user.coursesBought);
            setSelectedSkill(null);
        } else {
            // Filter courses based on the selected skill
            const filtered = user.coursesBought.filter(course => course.skills.includes(skill));
            setFilteredCourses(filtered);
            setSelectedSkill(skill);
        }
    };

    if (loading) {
        return <LoadingScreen isLightTheme={lightTheme}/>
    }

    if (error) {
        return <Text>Error loading data</Text>; // Display an error message if needed
    }

    if (isAnonymous) {
        return (
            <SafeAreaView style={[
                styles.container,
                { backgroundColor: lightTheme ? lightBackground : darkBackground },
            ]} >
                <Header headerName='Learn' />
                <Text style={{
                    fontFamily: 'GothicA1-600',
                    fontSize: 20,
                    color: '#00b5f0',
                    alignSelf: 'center',
                }} >Sign Up or Log In to purchase courses</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={[
            styles.container,
            { backgroundColor: lightTheme ? lightBackground : darkBackground },
        ]} >
            <Header headerName='Learn' />
            <View style={styles.content}>
                {/*<Topics courses={user.coursesBought} handleFilter={handleFilter} selectedSkill={selectedSkill} />*/}
                <Courses title={'Learning Dashboard'} allCourses={filteredCourses} navigation={navigation} skillFiltering={selectedSkill} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        gap: 30,
    },
});
