
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CourseDescription({ course }) {

    return (
        <View style={styles.container}>
            <Text style={styles.description}>{course.description}</Text>
            <View style={styles.contentWrapper}>
                <View style={styles.content}>
                    <View style={styles.iconWrapper} >
                        <Ionicons name={'globe-outline'} color={'#202020'} size={25} />
                    </View>
                    <View style={styles.textWrapper} >
                        <Text style={[styles.textTitle, {color: '#202020'}]}>Languages:</Text>
                        <Text style={[styles.text, {color: '#202020'}]}>{course.languages}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.iconWrapper} >
                        <Ionicons name={'bar-chart-outline'} color={'#202020'} size={25} />
                    </View>
                    <View style={styles.textWrapper} >
                        <Text style={[styles.textTitle, {color: '#202020'}]}>Level:</Text>
                        <Text style={[styles.text, {color: '#202020'}]}>{course.level}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.iconWrapper} >
                        <Ionicons name={'time-outline'} color={'#202020'} size={25} />
                    </View>
                    <View style={styles.textWrapper} >
                        <Text style={[styles.textTitle, {color: '#202020'}]}>Duration:</Text>
                        <Text style={[styles.text, {color: '#202020'}]}>{course.timeDuration}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        marginBottom: 40,
    },
    description: {
        fontFamily: 'GothicA1-400',
        fontSize: 20,
        marginBottom: 40,
    },
    contentWrapper: {
        gap: 10,
    },
    content: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    },
    iconWrapper: {
        padding: 8,
        borderRadius: 100,
        backgroundColor: '#eee',
    },
    textWrapper: {
        gap: 3,
    },
    textTitle: {
        fontFamily: 'GothicA1-600',
        fontSize: 16,
    },
    text: {
        fontFamily: 'GothicA1-400',
        fontSize: 16,
    },
})