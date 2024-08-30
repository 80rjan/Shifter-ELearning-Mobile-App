import React, { useRef, useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated, Alert, Platform} from 'react-native';
import CourseOutcomes from "../elements/CourseOutcomes";
import CourseSkills from "../elements/CourseSkills";
import CourseDescription from "../elements/CourseDescription";
import CourseModules from "../elements/CourseModules";
import { usePerson } from "../PersonInformationContext";
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import {auth, storage} from "../../firebaseConfig";
import {deleteUser} from "firebase/auth";
import {ref, getDownloadURL} from "firebase/storage";
import LoadingScreen from "./LoadingScreen";

export default function CourseDetails({ route, navigation }) {
    const { course } = route.params;
    const { user, addCourse, setHasAccount, lightTheme, lightBackground, darkBackground, textLightBackground, textDarkBackground } = usePerson();
    const isBought = user.coursesBought.some(courseBought => courseBought.title === course.title);
    const [downloadedUri, setDownloadedUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const isAnonymous = auth.currentUser?.isAnonymous;

    const scrollY = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        addCourse(course);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Learn' }],
        });
    };

    const handleDownload = async () => {
        setLoading(true);
        if (isBought) {
            try {
                // Reference to your file in Firebase Storage
                const fileRef = ref(storage, 'CourseBuyPdfTest.pdf');

                // Get the download URL
                const downloadURL = await getDownloadURL(fileRef);

                // Define file URI in the document directory
                const fileUri = `${FileSystem.documentDirectory}CourseBuyPdfTest.pdf`;

                // Download the file from the URL to the document directory
                const { uri } = await FileSystem.downloadAsync(downloadURL, fileUri);

                // Set the URI and share the file so the user can save it
                setDownloadedUri(uri);
                await Sharing.shareAsync(uri);
            } catch (error) {
                console.error("Download Error:", error.message);
                Alert.alert('Download Error', 'An error occurred while downloading the file.');
            }
            finally {
                setLoading(false);
            }
        } else {
            Alert.alert('Action Required', 'You need to purchase the course before downloading.');
            setLoading(false);
        }
    };

    const showAlert = () => {
        Alert.alert(
            'Are you sure you want to continue?',
            'You will be redirected to a page to sign up or log in. Your progress as a guest will be lost',
            [
                { text: 'No', style: 'destructive' },
                { text: 'Yes', style: 'default', onPress: handleLogOutGuest },
            ]
        );
    };

    const handleLogOutGuest = async () => {
        await deleteUser(auth.currentUser);
        setHasAccount(false);
    }

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
        loading ?
            <LoadingScreen isLightTheme={lightTheme} /> :
            <View style={[
                styles.container,
                {backgroundColor: lightTheme ? lightBackground : darkBackground}
            ]}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <View style={styles.imageWrapper}>
                        <Image source={course.image} style={styles.image}/>
                    </View>
                    <View style={styles.content}>
                        <Text style={[
                            styles.title,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>{course.title}</Text>
                        <CourseDescription course={course} />
                        <CourseOutcomes course={course} />
                        <CourseSkills course={course} />
                        <CourseModules course={course} />
                    </View>
                </ScrollView>
                <View style={[
                    styles.buttonWrapper,
                    {backgroundColor: lightTheme ? lightBackground : darkBackground}
                ]} >
                    <TouchableOpacity
                        style={[
                            styles.buyButton,
                            {backgroundColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                            isAnonymous && styles.buttonDisabled
                        ]}
                        onPress={isAnonymous ? showAlert : (isBought ? handleDownload : handlePress)}
                    >
                        <Text style={styles.buyButtonText}>
                            {isAnonymous ? 'Log In or Sign Up to purchase' : (isBought ? 'Download Course' : 'Start Your Journey') }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    buttonWrapper: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 10,
        width: '100%',
    },
    buyButton: {
        width: '95%',
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
    buttonDisabled: {
        backgroundColor: '#777',
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
