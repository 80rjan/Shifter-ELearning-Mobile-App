import {Platform, StyleSheet, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import {usePerson} from "../PersonInformationContext";


export default function CourseOutcomes({course}) {
    const {lightTheme, lightBackground, darkBackground, textLightBackground, textDarkBackground} = usePerson();

    console.log('Course: ', course);
    return (
        <View style={styles.container}>
            <Text style={[
                styles.title,
                {color: lightTheme ? textLightBackground : textDarkBackground},
            ]}>Course Highlights</Text>
            <View style={styles.outcomesWrapper}>
                {course.highlights.map((learn, index) => (
                    <View key={index} style={styles.item}>
                        <Ionicons name={'ribbon'} color={lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'} size={25} />
                        <Text style={[
                            styles.text,
                            {color: lightTheme ? textLightBackground : textDarkBackground},
                        ]}>{learn}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    title: {
        fontFamily: 'GothicA1-600',
        fontSize: 24,
        paddingBottom: 1,

        ...Platform.select({
            android: {
                fontSize: 22,
            }
        })
    },
    container: {
        gap: 20,
        marginBottom: 40,

        ...Platform.select({
            android: {
                marginBottom: 30,
                gap: 10,
            }
        })
    },
    outcomesWrapper: {
        gap: 10,

        ...Platform.select({
            android: {
                gap: 5,
            }
        })
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    text: {
        fontFamily: 'GothicA1-400',
        fontSize: 18,
        flexShrink: 1,

        ...Platform.select({
            android: {
                fontSize: 16,
            }
        })
    }
})