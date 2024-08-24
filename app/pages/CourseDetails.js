import React, { useRef, useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated, Alert, Platform} from 'react-native';
import CourseOutcomes from "../elements/CourseOutcomes";
import CourseSkills from "../elements/CourseSkills";
import CourseDescription from "../elements/CourseDescription";
import CourseModules from "../elements/CourseModules";
import { usePerson } from "../PersonInformationContext";
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing'; // Import Sharing module

export default function CourseDetails({ route, navigation }) {
    const { course } = route.params;
    const { user, addCourse } = usePerson();
    const isBought = user.coursesBought.some(courseBought => courseBought.title === course.title);
    const [downloadedUri, setDownloadedUri] = useState(null);

    const scrollY = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        addCourse(course);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Learn' }],
        });
    };

    const handleDownload = async () => {
        if (isBought) {
            try {
                // Load the PDF asset
                const asset = Asset.fromModule(require('../../assets/CourseBuyPdfTest.pdf'));
                await asset.downloadAsync();

                // Define file URI in the document directory
                const fileUri = `${FileSystem.documentDirectory}CourseBuyPdfTest.pdf`;

                // Copy the file from assets to the document directory
                await FileSystem.copyAsync({
                    from: asset.localUri,
                    to: fileUri,
                });

                // Set the URI and share the file so the user can save it
                setDownloadedUri(fileUri);
                await Sharing.shareAsync(fileUri);
            } catch (error) {
                Alert.alert('Download Error', 'An error occurred while downloading the file.');
            }
        } else {
            Alert.alert('Action Required', 'You need to purchase the course before downloading.');
        }
    };

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                if (event.nativeEvent.contentOffset.y <= -50) {
                    navigation.popToTop();
                }
            }
        }
    );

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={styles.imageWrapper}>
                    <Image source={course.image} style={styles.image} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{course.title}</Text>
                    <CourseDescription course={course} />
                    <CourseOutcomes course={course} />
                    <CourseSkills course={course} />
                    <CourseModules course={course} />
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.buyButton}
                onPress={isBought ? handleDownload : handlePress}
            >
                <Text style={styles.buyButtonText}>
                    {isBought ? 'Download Course' : 'Start Your Journey'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 80,
    },
    imageWrapper: {
        height: 180,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 3,

        ...Platform.select({
            android: {
                height: 150,
                marginBottom: 5,
            }
        })
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'GothicA1-800',
        fontSize: 24,
        textTransform: 'capitalize',
        marginBottom: 15,

        ...Platform.select({
            android: {
                fontSize: 22,
                marginBottom: 10,
            }
        })
    },
    buyButton: {
        position: 'absolute',
        bottom: 10,
        width: '80%',
        backgroundColor: '#00b5f0',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',

        ...Platform.select({
            android: {
                paddingVertical: 8,
            }
        })
    },
    buyButtonText: {
        fontFamily: 'GothicA1-700',
        color: '#fff',
        fontSize: 20,

        ...Platform.select({
            android: {
                fontSize: 20,
            }
        })
    },
});
