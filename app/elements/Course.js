// Course.js
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { usePerson } from '../PersonInformationContext';

export default function Course({ navigation, course }) {
    const { person, addFavorites, removeFavorites } = usePerson();
    const [heartIcon, setHeartIcon] = useState('heart-outline');
    const favoriteCourses = person.coursesFavorite;
    const boughtCourses = person.coursesBought;

    const isBought = boughtCourses.some(boughtCourses => boughtCourses.title === course.title);

    useEffect(() => {
        const isFavorite = favoriteCourses.some(favoriteCourse => favoriteCourse.title === course.title);
        setHeartIcon(isFavorite ? 'heart' : 'heart-outline');

    }, [favoriteCourses, course.title]);

    const handleFavoritePress = () => {
        if (heartIcon === 'heart-outline') {
            addFavorites(course);
            // navigation.navigate('Wishlist');
        } else {
            removeFavorites(course);
            // navigation.navigate('Home');
        }
    };

    return (
        <TouchableOpacity
            style={styles.courseWrapper}
            onPress={() => navigation.navigate('CourseDetails', { course })}
        >
            <View style={styles.contentWrapper}>
                <Text style={[styles.title, { color: '#202020' }]}>{course.title}</Text>
                <View>
                    <Text style={[styles.topicDuration, { color: '#202020' }]}>{course.topic}</Text>
                    <Text style={[styles.topicDuration, { color: '#202020' }]}>{course.duration}</Text>
                </View>
                {!isBought && (
                    <View style={styles.priceFavorite}>
                        <Text style={[styles.price, { color: '#202020' }]}>{course.price}$</Text>
                        <TouchableOpacity onPress={handleFavoritePress}>
                            <Ionicons name={heartIcon} color={'#00b5f0'} size={Platform.OS==='android' ? 20 : 25} />
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
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
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
        fontSize: 16,

        ...Platform.select({
            android: {
                fontSize: 14,
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
