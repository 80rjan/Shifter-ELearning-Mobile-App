
import {View, Text, StyleSheet, Platform} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import {usePerson} from "../PersonInformationContext";

export default function CourseModules({ course }) {
    const { lightTheme, textLightBackground, textDarkBackground} = usePerson();

    return (
        <View style={styles.container}>
            <Text style={[
                styles.title,
                {color: lightTheme ? textLightBackground : textDarkBackground}
            ]}>Module Breakdown</Text>
            <View style={styles.modulesWrapper}>
                {course.modules.map((module, index) => (
                    <View key={index} style={[
                        styles.module,
                        {borderBottomColor: lightTheme ? 'rgba(51,51,51,0.5)' : 'rgba(221,221,221,0.5)' }
                    ]}>
                        <Text style={[
                            styles.text,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>{module}</Text>
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