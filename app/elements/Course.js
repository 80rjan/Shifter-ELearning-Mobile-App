import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { usePerson } from '../PersonInformationContext';

export default function Course({ navigation, course, isRecommendation }) {
    const { user, addFavorites, removeFavorites, lightTheme, textLightBackground, textDarkBackground } = usePerson();
    const [heartIcon, setHeartIcon] = useState('heart-outline');
    const [loadingImage, setLoadingImage] = useState(true); // State to track image loading

    const isBought = user.coursesBought.some(boughtCourses => boughtCourses.title === course.title);

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    React.useEffect(() => {
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

    const handleImageLoad = () => {
        setLoadingImage(false); // Image loaded successfully
    };

    const handleImageError = () => {
        setLoadingImage(false); // Image failed to load
    };

    return (
        <TouchableOpacity
            style={[
                styles.courseWrapper,
                { backgroundColor: lightTheme ? '#f5f5f5' : '#333' },
                !lightTheme ? { borderWidth: 2, borderColor: '#444' } : null,
                isBought && Platform.OS === 'android' && {paddingVertical: 16}
            ]}
            onPress={() => navigation.navigate('CourseDetails', { course })}
        >
            <View style={styles.contentWrapper}>
                <Text style={[styles.title, { color: lightTheme ? textLightBackground : textDarkBackground }]}>{capitalize(course.title)}</Text>
                <View>
                    <Text style={[styles.topicDuration, { color: lightTheme ? textLightBackground : textDarkBackground }]}>{course.level}</Text>
                    <Text style={[styles.topicDuration, { color: lightTheme ? textLightBackground : textDarkBackground }]}>{course.durationMicroCourses + ' micro-courses, ' + course.durationTime + ' hours'}</Text>
                </View>
                {!isBought && (
                    <View style={styles.priceFavorite}>
                        <Text style={[styles.price, { color: lightTheme ? textLightBackground : textDarkBackground }]}>{course.price}$</Text>
                        <TouchableOpacity onPress={handleFavoritePress} >
                            <Ionicons name={heartIcon} color={lightTheme ? '#00b5f0' : '#00b5f0'} size={Platform.OS === 'android' ? 25 : 28} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {!isRecommendation && (
                <View style={styles.imageWrapper}>
                    {loadingImage && (
                        <ActivityIndicator style={styles.loadingIndicator} size="small" color={lightTheme ? '#000' : '#fff'} />
                    )}
                    <Image
                        style={styles.image}
                        source={{ uri: course.imageFile }}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    courseWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        justifyContent: 'space-between',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        marginBottom: 15,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,

        ...Platform.select({
            android: {
                gap: 10,
                paddingVertical: 8,
                paddingHorizontal: 16,
                elevation: 3,
            }
        })
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'flex-start',
        gap: 5,

        ...Platform.select({
            android: {
                gap: 3,
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

        ...Platform.select({
            android: {
                fontSize: 12,
            }
        })
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
        width: '30%', // Adjust width and height as needed
        aspectRatio: 1,
        position: 'relative', // To position the loading indicator
    },
    image: {
        width: '100%', // Adjust width and height as needed
        height: '100%',
        borderRadius: 3,
    },
    loadingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
    }
});
