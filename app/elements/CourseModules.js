
import {View, Text, StyleSheet, Platform} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

export default function CourseModules({ course }) {

    return (
        <View style={styles.container}>
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
    container: {
        gap: 10,    //because of the vertical padding on each text item
        marginBottom: 20,

        ...Platform.select({
            android: {
                marginBottom: 10,
                gap: 5,
            }
        })
    },
    title: {
        fontFamily: 'GothicA1-600',
        fontSize: 24,

        ...Platform.select({
            android: {
                fontSize: 22,
            }
        })
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

        ...Platform.select({
            android: {
                fontSize: 14,
                paddingVertical: 5,
            }
        })
    }
})