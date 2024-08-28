// Course.js
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { usePerson } from '../PersonInformationContext';

export default function Course({ navigation, course }) {
    const { user, addFavorites, removeFavorites, lightTheme, lightBackground, darkBackground, textLightBackground, textDarkBackground } = usePerson();
    const [heartIcon, setHeartIcon] = useState('heart-outline');

    const isBought = user.coursesBought.some(boughtCourses => boughtCourses.title === course.title);

    useEffect(() => {
        const isFavorite = user.coursesFavorite.some(favoriteCourse => favoriteCourse.title === course.title);
        setHeartIcon(isFavorite ? 'heart' : 'heart-outline');

    }, [user.coursesFavorite, course.title]);

    const handleFavoritePress = () => {
        if (heartIcon === 'heart-outline') {
            addFavorites(course);
        } else {
            removeFavorites(course);
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.courseWrapper,
                { backgroundColor: lightTheme ? '#f5f5f5' : '#333' },
                !lightTheme ? { borderWidth: 2, borderColor: '#444', } : null
            ]}
            onPress={() => navigation.navigate('CourseDetails', { course })}
        >
            <View style={styles.contentWrapper}>
                <Text style={[styles.title, { color: lightTheme ? textLightBackground : textDarkBackground }]}>{course.title}</Text>
                <View>
                    <Text style={[styles.topicDuration, { color: lightTheme ? textLightBackground : textDarkBackground }]}>{course.topic}</Text>
                    <Text style={[styles.topicDuration, { color: lightTheme ? textLightBackground : textDarkBackground }]}>{course.duration}</Text>
                </View>
                {!isBought && (
                    <View style={styles.priceFavorite}>
                        <Text style={[styles.price, { color: lightTheme ? textLightBackground : textDarkBackground }]}>{course.price}$</Text>
                        <TouchableOpacity onPress={handleFavoritePress}>
                            <Ionicons name={heartIcon} color={lightTheme ? '#00b5f0' : '#00b5f0'} size={Platform.OS==='android' ? 25 : 28} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={course.image} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    courseWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
        justifyContent: 'space-between',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        marginBottom: 15,
        maxWidth: '100%',
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,

        ...Platform.select({
            android: {
                gap: 10,
                paddingVertical: 10,
                elevation: 2,
            }
        })
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'flex-start',
        gap: 5,

        ...Platform.select({
            android: {
                gap: 5,
            }
        })
    },
    priceFavorite: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

        ...Platform.select({
            android: {
                gap: 8,
            }
        })
    },
    title: {
        fontFamily: 'GothicA1-600',
        fontSize: 18,

        ...Platform.select({
            android: {
                fontSize: 16,
            }
        })
    },
    topicDuration: {
        fontFamily: 'Roboto-300',
        fontSize: 14,
    },
    price: {
        fontFamily: 'Roboto-400',
        fontSize: 18,

        ...Platform.select({
            android: {
                fontSize: 16,
            }
        })
    },
    imageWrapper: {
        borderRadius: 3,
        shadowColor: 'black',
        shadowOffset: { width: -3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5, // For Android
    },
    image: {
        borderRadius: 3,
        transform: [{ scale: 1.1 }],
    }
});
