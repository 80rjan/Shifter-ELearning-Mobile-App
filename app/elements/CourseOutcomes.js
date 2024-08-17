import {Platform, StyleSheet, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";


export default function CourseOutcomes({course}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: '#202020'}]}>Course Highlights</Text>
            <View style={styles.outcomesWrapper}>
                {course.outcomes.map((learn, index) => (
                    <View key={index} style={styles.item}>
                        <Ionicons name={'ribbon-outline'} color={'#00b5f0'} size={25} />
                        <Text style={[styles.text, {color: '#202020'}]}>{learn}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    title: {
        fontFamily: 'GothicA1-500',
        fontSize: 25,

        ...Platform.select({
            android: {
                fontSize: 23,
            }
        })
    },
    container: {
        gap: 20,
        marginBottom: 50,

        ...Platform.select({
            android: {
                marginBottom: 30,
                gap: 10,
            }
        })
    },
    outcomesWrapper: {
        gap: 8,

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