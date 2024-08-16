import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { usePerson } from '../PersonInformationContext'; // Import the context hook
import Header from "../elements/Header";
import Topics from "../elements/Topics";
import Courses from "../elements/Courses";

export default function Learn({ navigation }) {
    const { person } = usePerson(); // Use the context hook to get person data
    const yourCourses = person.coursesBought; // Get bought courses from context

    return (
        <SafeAreaView style={styles.container}>
            <Header headerName='Learn' />
            <View style={styles.content}>
                <Topics />
                <Courses title={'Your Courses'} allCourses={yourCourses} navigation={navigation} />
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
