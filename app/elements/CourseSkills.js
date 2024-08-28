import {Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {usePerson} from "../PersonInformationContext";

export default function CourseSkills({course}) {
    const { lightTheme, textLightBackground, textDarkBackground} = usePerson();

    return (
        <View style={styles.container}>
            <Text style={[
                styles.title,
                {color: lightTheme ? textLightBackground : textDarkBackground}
            ]}>Skills Acquired</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {course.skills.map((skill, index) => (
                    <View style={[
                        styles.skill,
                        {backgroundColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'}
                    ]} key={index}>
                        <Text style={[
                            styles.text,
                            {color: textDarkBackground}
                        ]} >{skill}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    title: {
        fontFamily: 'GothicA1-600',
        fontSize: 24,

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
    scrollView: {
        gap: 5,
    },
    skill: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 10,

        ...Platform.select({
            android: {
                paddingVertical: 5,
                paddingHorizontal: 10,
            }
        })
    },
    text: {
        fontFamily: 'GothicA1-500',
        fontSize: 16,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    }
})