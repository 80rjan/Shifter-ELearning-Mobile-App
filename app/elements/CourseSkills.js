import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";

export default function CourseSkills({course}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: '#202020'}]}>Skills You'll Gain</Text>
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
        fontFamily: 'GothicA1-500',
        fontSize: 25,
    },
    container: {
        gap: 20,
        marginBottom: 50,
    },
    scrollView: {
        gap: 5,
    },
    skill: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 5,
        backgroundColor: '#eee',
        marginRight: 10,
    },
    text: {
        fontFamily: 'GothicA1-400',
        fontSize: 16,
    }
})