import React, { useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

// Import or create your placeholder animation image
const placeholderAnimation = require('../../assets/Load Animation.gif');

export default function CourseImage({ imageUri }) {
    const [isLoading, setIsLoading] = useState(true);
    const [imageHeight, setImageHeight] = useState(0);

    // Animated value for opacity
    const opacity = new Animated.Value(0);

    // Handle image load event
    const handleImageLoad = () => {
        setIsLoading(false);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300, // Fade-in duration
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.imageWrapper}>
            {isLoading && (
                <Image
                    style={styles.placeholderImage}
                    source={placeholderAnimation}
                />
            )}
            <Animated.Image
                style={[
                    styles.image,
                    // { opacity: opacity }
                ]}
                source={{ uri: imageUri }}
                onLoad={handleImageLoad}
                onError={() => setIsLoading(false)} // Handle any loading errors
                onLayout={(event) => {
                    // Get image dimensions to adjust placeholder image size if needed
                    const { height } = event.nativeEvent.layout;
                    setImageHeight(height);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageWrapper: {
        borderRadius: 3,
        shadowColor: 'black',
        shadowOffset: { width: -3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5, // For Android
        width: '30%', // Adjust width and height as needed
        aspectRatio: 1,
        position: 'relative',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 3,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 3,
    }
});
