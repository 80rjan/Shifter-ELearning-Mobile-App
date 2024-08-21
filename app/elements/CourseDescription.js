
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CourseDescription({ course }) {
    const iconSize = 28;

    return (
        <View style={styles.container}>
            <Text style={styles.description}>{course.description}</Text>
            <View style={styles.contentWrapper}>
                <View style={styles.content}>
                    <View style={styles.iconWrapper} >
                        <Ionicons name={'globe-outline'} color={'#777'} size={iconSize} />
                    </View>
                    <View style={styles.textWrapper} >
                        <Text style={[styles.textTitle, {color: '#202020'}]}>Languages:</Text>
                        <Text style={[styles.text, {color: '#202020'}]}>{course.languages}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.iconWrapper} >
                        <Ionicons name={'layers-outline'} color={'#777'} size={iconSize} />
                    </View>
                    <View style={styles.textWrapper} >
                        <Text style={[styles.textTitle, {color: '#202020'}]}>Level:</Text>
                        <Text style={[styles.text, {color: '#202020'}]}>{course.level}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.iconWrapper} >
                        <Ionicons name={'timer-outline'} color={'#777'} size={iconSize} />
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
        backgroundColor: '#f0f0f0',
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