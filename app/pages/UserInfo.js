import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert, ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ShifterLogo from "../../assets/ShifterLogo";
import { usePerson } from "../PersonInformationContext";
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import {sendEmailVerification} from "firebase/auth";
import { auth, db } from '../../firebaseConfig';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function UserInfo({ navigation, onUserInfoComplete }) {
    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(auth.currentUser.emailVerified);
    const coursesBought = [];
    const coursesFavorite = [];
    const skills = [];
    const points = 0;
    const profilePicture = null;
    const email = auth.currentUser.email;

    const [nameFocus, setNameFocus] = useState(false);
    const [jobTitleFocus, setJobTitleFocus] = useState(false);
    const [companyFocus, setCompanyFocus] = useState(false);

    const { changeUserDetails, lightTheme, lightBackground, darkBackground, textLightBackground, textDarkBackground } = usePerson();

    const handleSubmit = async () => {
        if (name && jobTitle && company) {
            try {
                setIsLoading(true);
                const userId = auth.currentUser?.uid;
                if (userId) {
                    await setDoc(doc(db, 'users', userId), {
                        name,
                        email,
                        jobTitle,
                        company,
                        coursesBought,
                        coursesFavorite,
                        skills,
                        points,
                        profilePicture,
                    }, { merge: true }); // Merge to update only specific fields
                    changeUserDetails({ name, email, jobTitle, company, coursesBought, coursesFavorite, skills, points, profilePicture });
                    onUserInfoComplete();
                }
            } catch (error) {
                console.error('Error saving user info: ', error);
            }
            finally {
                setIsLoading(false);
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    const handleCheckEmailVerification = async () => {
        try {
            setIsLoading(true);
            const user = auth.currentUser;
            if (user) {
                await user.reload(); // Refresh user data
                if (user.emailVerified) {
                    Alert.alert('Email Verified', 'Your email address is verified.');
                    setIsVerified(true);
                } else {
                    Alert.alert('Email Not Verified', 'Your email address is not verified yet. Please check your inbox for the verification email.');
                }
            } else {
                Alert.alert('Error', 'No user is currently logged in.');
            }
        } catch (error) {
            console.error('Error checking email verification: ', error);
            Alert.alert('Error', 'Failed to check email verification status.');
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const userId = auth.currentUser?.uid;
            if (userId) {
                // Delete Firebase Auth user
                await auth.currentUser.delete();
                Alert.alert('Progress Lost', 'Your progress for creating an account was lost');
                navigation.navigate('LoginSignup');
            }
        } catch (error) {
            console.error('Error deleting account: ', error);
            Alert.alert('Error', 'Failed to delete account.');
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            handleDeleteAccount();
        })
    }, [navigation]);

    const handleResendVerificationEmail = async () => {
        try {
            setIsLoading(true);
            const user = auth.currentUser;
            if (user) {
                await sendEmailVerification(user);
                Alert.alert('Verification Email Sent', 'A new verification email has been sent to your inbox.');
            } else {
                Alert.alert('Error', 'No user is currently logged in.');
            }
        } catch (error) {
            console.error('Error resending verification email: ', error);
            Alert.alert('Error', 'Failed to resend verification email.');
        }
        finally {
            setIsLoading(false);
        }
    };


    if (!isVerified) return (
        <SafeAreaView style={[
            styles.safeView,
            {
                backgroundColor: lightTheme ? lightBackground : darkBackground,
            },
        ]}>
            <View style={styles.logo}>
                <ShifterLogo width='250' height='125' color={!lightTheme ? lightBackground : darkBackground}/>
            </View>
            <View style={styles.verificationWrapper} >
                <TouchableOpacity style={[
                    styles.checkEmailVerification,
                    {backgroundColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'}
                ]} onPress={handleCheckEmailVerification}>
                    <Text style={styles.checkEmailVerificationText} >
                        Check Email Verification
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[
                    styles.resendEmailVerification,
                    {backgroundColor: lightTheme ? '#aaa' : '#666'}
                ]} onPress={handleResendVerificationEmail}>
                    <Text style={styles.resendEmailVerificationText} >
                        Resend Email
                    </Text>
                </TouchableOpacity>
            </View>
            {isLoading &&
                <ActivityIndicator color={!lightTheme ? lightBackground : darkBackground} size='large' />
            }
        </SafeAreaView>
    )

    return (
        <SafeAreaView style={[
            styles.safeView,
            {backgroundColor: lightTheme ? lightBackground : darkBackground}
        ]}>
            <KeyboardAvoidingView
                style={styles.container}
            >
                <View style={styles.logo}>
                    <ShifterLogo width='250' height='125' color={!lightTheme ? lightBackground : darkBackground}/>
                </View>
                <KeyboardAwareScrollView
                    style={styles.content}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <Text style={[
                        styles.title,
                        {color: lightTheme ? textLightBackground : textDarkBackground}
                    ]}>Enter Your Details</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={[
                            styles.inputText,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>Name</Text>
                        <TextInput
                            placeholder="Enter your name"
                            placeholderTextColor={lightTheme ? '#aaa' : '#555'}
                            value={name}
                            onChangeText={setName}
                            style={[
                                styles.input,
                                {color: lightTheme ? textLightBackground : textDarkBackground},
                                {borderColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                nameFocus && styles.inputFocus
                            ]}
                            autoCapitalize={"words"}
                            onFocus={() => setNameFocus(true) }
                            onBlur={() => setNameFocus(false)}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={[
                            styles.inputText,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>Job Title</Text>
                        <TextInput
                            placeholder="Enter your job title"
                            placeholderTextColor={lightTheme ? '#aaa' : '#555'}
                            value={jobTitle}
                            onChangeText={setJobTitle}
                            style={[
                                styles.input,
                                {color: lightTheme ? textLightBackground : textDarkBackground},
                                {borderColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                jobTitleFocus && styles.inputFocus
                            ]}
                            autoCapitalize={"words"}
                            onFocus={() => setJobTitleFocus(true) }
                            onBlur={() => setJobTitleFocus(false)}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={[
                            styles.inputText,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>Company</Text>
                        <TextInput
                            placeholder="Enter your company"
                            placeholderTextColor={lightTheme ? '#aaa' : '#555'}
                            value={company}
                            onChangeText={setCompany}
                            style={[
                                styles.input,
                                {color: lightTheme ? textLightBackground : textDarkBackground},
                                {borderColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                companyFocus && styles.inputFocus
                            ]}
                            autoCapitalize={"words"}
                            onFocus={() => setCompanyFocus(true) }
                            onBlur={() => setCompanyFocus(false)}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={[
                            styles.button,
                            {backgroundColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'}
                        ]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>
            {isLoading &&
                <ActivityIndicator color={!lightTheme ? lightBackground : darkBackground} size='large' />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
    },
    logo: {
        alignItems: 'center',

        ...Platform.select({
            android: {
                marginTop: '10%',
            }
        })
    },
    verificationWrapper: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        gap: 10
    },
    checkEmailVerification: {
        paddingVertical: 15,
        width: '70%',
        borderRadius: 5,

        ...Platform.select({
            android: {
                paddingVertical: 10,
            }
        })
    },
    resendEmailVerification: {
        paddingVertical: 10,
        width: '70%',
        borderRadius: 5,

        ...Platform.select({
            android: {
                paddingVertical: 8
            }
        })
    },
    resendEmailVerificationText: {
        fontFamily: 'GothicA1-600',
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
    },
    checkEmailVerificationText: {
        fontFamily: 'GothicA1-600',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    container: {
        paddingTop: '5%',
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    title: {
        fontFamily: 'GothicA1-400',
        fontSize: 24,
        paddingBottom: 1,
        alignSelf: 'center',
        marginBottom: 20,

        ...Platform.select({
            android: {
                marginBottom: 16,
            }
        })
    },
    inputWrapper: {
        gap: 10,
        marginBottom: 30,

        ...Platform.select({
            android: {
                gap: 8,
                marginBottom: 20,
            }
        })
    },
    input: {
        borderColor: '#00b5f0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 13,
        fontFamily: 'GothicA1-400',
        fontSize: 16,

        ...Platform.select({
            android: {
                paddingVertical: 8,
            }
        })
    },
    inputFocus: {
        borderWidth: 3,
    },
    inputText: {
        fontFamily: 'GothicA1-400',
        fontSize: 16,
    },
    buttonWrapper: {
        gap: 10,
        flex: 1,
    },
    button: {
        backgroundColor: '#00b5f0',
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 10,
        width: '70%',
        alignSelf: 'center',

        ...Platform.select({
            android: {
                paddingVertical: 4,
            }
        })
    },
    buttonText: {
        fontFamily: 'GothicA1-700',
        color: '#fff',
        fontSize: 20,
    },
});
