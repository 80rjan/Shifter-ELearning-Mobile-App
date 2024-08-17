import {Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";

export default function CourseSkills({course}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: '#202020'}]}>Skills Acquired</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {course.skills.map((skill, index) => (
                    <View style={styles.skill} key={index}>
                        <Text style={[styles.text, {color: '#202020'}]} >{skill}</Text>
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
        backgroundColor: '#eee',
        marginRight: 10,

        ...Platform.select({
            android: {
                paddingVertical: 5,
                paddingHorizontal: 10,
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
    }
})