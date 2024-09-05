import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Animated,
    Modal,
    Alert,
    Platform
} from 'react-native';
import CourseOutcomes from "../elements/CourseOutcomes";
import CourseSkills from "../elements/CourseSkills";
import CourseDescription from "../elements/CourseDescription";
import CourseModules from "../elements/CourseModules";
import ModalAlert from "../elements/ModalAlert";
import { usePerson } from "../PersonInformationContext";
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import { auth, storage } from "../../firebaseConfig";
import { deleteUser } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import LoadingScreen from "./LoadingScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import StackMentorDetails from "./StackMentorDetails";
import MentorBriefDetails from "../elements/MentorBriefDetails";

export default function CourseDetails({ route, navigation }) {
    const { course } = route.params;
    const {
        user,
        addFavorites,
        removeFavorites,
        loading,
        setLoading,
        addCourse,
        setHasAccount,
        lightTheme,
        lightBackground,
        darkBackground,
        textLightBackground,
        textDarkBackground
    } = usePerson();
    const isBought = user.coursesBought.some(courseBought => courseBought.title === course.title);
    const [heartIcon, setHeartIcon] = React.useState('heart-outline');
    const [downloadedUri, setDownloadedUri] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const isAnonymous = auth.currentUser?.isAnonymous;

    const scrollY = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        addCourse(course);
        setModalVisible(true); // Show the modal
    };

    const handleDownload = async () => {
        setLoading(true);
        if (isBought) {
            try {
                const fileRef = ref(storage, 'CourseBuyPdfTest.pdf');
                const downloadURL = await getDownloadURL(fileRef);
                const fileUri = `${FileSystem.documentDirectory}CourseBuyPdfTest.pdf`;
                const { uri } = await FileSystem.downloadAsync(downloadURL, fileUri);
                setDownloadedUri(uri);
                await Sharing.shareAsync(uri);
            } catch (error) {
                console.error("Download Error:", error.message);
                Alert.alert('Download Error', 'An error occurred while downloading the file.');
            } finally {
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
        setLoading(true);
        await deleteUser(auth.currentUser);
        setHasAccount(false);
        setLoading(false);
    };

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

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                if (event.nativeEvent.contentOffset.y <= -150) {
                    navigation.popToTop();
                }
            }
        }
    );

    return (
        loading ? (
            <LoadingScreen isLightTheme={lightTheme} />
        ) : (
            <View
                style={[
                    styles.container,
                    { backgroundColor: lightTheme ? lightBackground : darkBackground }
                ]}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: course.imageFile }} style={styles.image} />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleWrapper}>
                            <Text
                                style={[
                                    styles.title,
                                    { color: lightTheme ? textLightBackground : textDarkBackground },
                                    !isBought && { maxWidth: '90%' }
                                ]}
                            >
                                {course.title}
                            </Text>
                            {!isBought && (
                                <TouchableOpacity onPress={handleFavoritePress} style={{ padding: 5, paddingRight: 0 }}>
                                    <Ionicons
                                        name={heartIcon}
                                        color={lightTheme ? '#00b5f0' : '#00b5f0'}
                                        size={Platform.OS === 'android' ? 28 : 32}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        <CourseDescription course={course} />
                        <CourseOutcomes course={course} />
                        <CourseSkills course={course} />
                        <MentorBriefDetails navigateToDetails={() => navigation.navigate('MentorDetails', { course: course })} />
                        <CourseModules course={course} />
                    </View>
                </ScrollView>
                <View
                    style={[
                        styles.buttonWrapper,
                        { backgroundColor: lightTheme ? lightBackground : darkBackground }
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.buyButton,
                            {backgroundColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                            isAnonymous && styles.buttonDisabled
                            ]}
                        onPress={isAnonymous ? showAlert : (isBought ? handleDownload : handlePress)}
                    >
                        <Text style={styles.buyButtonText}>
                            {isAnonymous ? 'Log In or Sign Up to purchase' : isBought ? 'Download Course' : 'Start Your Journey'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <ModalAlert
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    handleContinue={() => {
                        setModalVisible(false);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Education' }],
                        });
                    }}
                    handleFunction={handleDownload}
                    functionButtonText='Download Course'
                />
            </View>
        )
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
        height: 200,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        ...Platform.select({
            android: {
                elevation: 4,
                height: 160,
                marginBottom: 5,
            },
        }),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        paddingHorizontal: 20,
    },
    titleWrapper: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Platform.select({
            android: {
                marginBottom: 8,
            },
        }),
    },
    title: {
        fontFamily: 'GothicA1-800',
        fontSize: 24,
        textTransform: 'capitalize',
        ...Platform.select({
            android: {
                fontSize: 22,
            },
        }),
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
            },
        }),
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
            },
        }),
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontFamily: 'GothicA1-700',
        fontSize: 22,
        marginBottom: 10,
    },
    modalMessage: {
        fontFamily: 'GothicA1-500',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#00b5f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontFamily: 'GothicA1-700',
        fontSize: 16,
    },
});
