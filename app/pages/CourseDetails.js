import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import CourseOutcomes from "../elements/CourseOutcomes";
import CourseSkills from "../elements/CourseSkills";
import CourseDescription from "../elements/CourseDescription";
import CourseModules from "../elements/CourseModules";
import {usePerson} from "../PersonInformationContext";

export default function CourseDetails({ route }) {
    const { course } = route.params;
    const { addCourse } = usePerson();

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageWrapper}>
                    <Image source={course.image} style={styles.image} />
                </View>
                <View style={styles.content}>
                    <Text style={[styles.title, {color: '202020'}]}>{course.title}</Text>
                    <CourseDescription course={course} />
                    <CourseOutcomes course={course}/>
                    <CourseSkills course={course} />
                    <CourseModules course={course} />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.buyButton} onPress={() => { addCourse(course) }}>
                <Text style={styles.buyButtonText}>Start Your Journey</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 80, // Ensure ScrollView content doesn't overlap with the button
    },
    imageWrapper: {
        height: 180,
        marginBottom: 15,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 3,

        // Elevation for Android
        elevation: 15, // Significantly increase elevation
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'GothicA1-700',
        fontSize: 28,
        textTransform: 'capitalize',
        marginBottom: 20,
    },
    buyButton: {
        position: 'absolute',
        bottom: 10,
        width: '70%',
        backgroundColor: '#00b5f0',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: -5, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        // Elevation for Android
        elevation: 10, // Significantly increase elevation
    },
    buyButtonText: {
        fontFamily: 'GothicA1-600',
        color: '#fff',
        fontSize: 25,

    },
});
