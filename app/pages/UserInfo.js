import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ShifterLogo from "../../assets/ShifterLogo";
import { usePerson } from "../PersonInformationContext";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

export default function UserInfo({ onUserInfoComplete }) {
    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
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
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <SafeAreaView style={[
            styles.safeView,
            {backgroundColor: lightTheme ? lightBackground : darkBackground}
        ]}>
            <KeyboardAvoidingView
                style={styles.container}
            >
                <View style={styles.logo}>
                    <ShifterLogo width='250' height='125' color={!lightTheme ?  lightBackground : darkBackground}/>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
    },
    logo: {
        alignItems: 'center',
    },
    container: {
        paddingTop: '5%',
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    verifyEmail: {
        flex: 1,
        justifyContent: 'center',
    },
    verifyEmailText: {
        alignSelf: 'center',
        marginBottom: 20,
        fontFamily: 'GothicA1-500',
        fontSize: 22,
        color: 'red',
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
    },
    inputWrapper: {
        gap: 10,
        marginBottom: 30,
    },
    input: {
        borderColor: '#00b5f0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 13,
        fontFamily: 'GothicA1-400',
        fontSize: 16,
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
    },
    buttonText: {
        fontFamily: 'GothicA1-700',
        color: '#fff',
        fontSize: 20,
    },
});
