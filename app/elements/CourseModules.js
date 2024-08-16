
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

export default function CourseModules({ course }) {

    return (
        <View style={styles.wrapper}>
        <Text style={[styles.title, {color: '#202020'}]}>Module Breakdown</Text>
        <View style={styles.modulesWrapper}>
            {course.modules.map((module, index) => (
                <View key={index} style={styles.module}>
                    <Text style={[styles.text, {color: '#202020'}]}>{module}</Text>
                </View>
            ))}
        </View>
        </View>
    )
}

const styles=StyleSheet.create({
    wrapper: {
        gap: 20,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'GothicA1-500',
        fontSize: 25,
    },
    modulesWrapper: {
        paddingHorizontal: 10,
    },
    module: {
        borderBottomColor: 'rgba(0,181,240,0.5)',
        borderBottomWidth: 1,
    },
    text: {
        fontFamily: 'GothicA1-400',
        fontSize: 18,
        paddingVertical: 10,
    }
})