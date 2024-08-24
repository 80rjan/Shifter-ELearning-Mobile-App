import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { usePerson } from '../PersonInformationContext'; // Import the context hook
import Header from "../elements/Header";
import Topics from "../elements/Topics";
import Courses from "../elements/Courses";

export default function Learn({ navigation }) {
    const { user, loading, error } = usePerson(); // Use the context hook to get person data
    const [filteredCourses, setFilteredCourses] = useState(user.coursesBought);
    const [selectedSkill, setSelectedSkill] = useState(null);

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
        return <Text>Loading...</Text>; // You can replace this with a more sophisticated loading indicator
    }

    if (error) {
        return <Text>Error loading data</Text>; // Display an error message if needed
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header headerName='Learn' />
            <View style={styles.content}>
                <Topics courses={filteredCourses} handleFilter={handleFilter} selectedSkill={selectedSkill} />
                <Courses title={'Learning Dashboard'} allCourses={filteredCourses} navigation={navigation} skillFiltering={selectedSkill} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    content: {
        flex: 1,
        gap: 30,
    },
});
