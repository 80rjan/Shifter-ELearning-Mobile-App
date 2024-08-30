
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {usePerson} from "../PersonInformationContext";

export default function CourseDescription({ course }) {
    const iconSize = 28;
    const { lightTheme, textLightBackground, textDarkBackground} = usePerson();


    console.log(course.languages, course.level, course.timeDuration);
    return (
        <View style={styles.container}>
            <Text style={[
                styles.description,
                {color: lightTheme ? textLightBackground : textDarkBackground}
            ]}>{course.description}</Text>
            <View style={styles.contentWrapper}>
                <View style={styles.content}>
                    <View style={[
                        styles.iconWrapper,
                        {backgroundColor: lightTheme ? '#ddd' : '#333'}
                    ]} >
                        <Ionicons name={'globe-outline'} color={lightTheme ? '#777' : '#888'} size={iconSize} />
                    </View>
                    <View style={styles.textWrapper} >
                        <Text style={[
                            styles.textTitle,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>Languages:</Text>
                        <Text style={[
                            styles.text,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>{course.languages}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={[
                        styles.iconWrapper,
                        {backgroundColor: lightTheme ? '#ddd' : '#333'}
                    ]} >
                        <Ionicons name={'layers-outline'} color={lightTheme ? '#777' : '#888'} size={iconSize} />
                    </View>
                    <View style={styles.textWrapper} >
                        <Text style={[
                            styles.textTitle,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>Level:</Text>
                        <Text style={[
                            styles.text,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>{course.level}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={[
                        styles.iconWrapper,
                        {backgroundColor: lightTheme ? '#ddd' : '#333'}
                    ]} >
                        <Ionicons name={'timer-outline'} color={lightTheme ? '#777' : '#888'} size={iconSize} />
                    </View>
                    <View style={styles.textWrapper} >
                        <Text style={[
                            styles.textTitle,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                            ]}>Duration:</Text>
                        <Text style={[
                            styles.text,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                            ]}>{course.timeDuration}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        marginBottom: 40,

        ...Platform.select({
            android: {
                marginBottom: 25,
            }
        })
    },
    description: {
        fontFamily: 'GothicA1-400',
        fontSize: 18,
        marginBottom: 30,

        ...Platform.select({
            android: {
                fontSize: 16,
                marginBottom: 25,
            }
        })
    },
    contentWrapper: {
        gap: 15,

        ...Platform.select({
            android: {
                gap: 10,
            }
        })
    },
    content: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    },
    iconWrapper: {
        padding: 8,
        borderRadius: 1000,
    },
    textWrapper: {
        gap: 3,

        ...Platform.select({
            android: {
                gap: 0,
            }
        })
    },
    textTitle: {
        fontFamily: 'GothicA1-600',
        fontSize: 16,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    },
    text: {
        fontFamily: 'GothicA1-400',
        fontSize: 16,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    },
})