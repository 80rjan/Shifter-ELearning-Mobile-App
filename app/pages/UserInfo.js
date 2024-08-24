import React, { useState } from 'react';
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
import { db } from '../../firebaseConfig';
import {getAuth} from "firebase/auth";


export default function UserInfo({ navigateToHome, user, onUserInfoComplete }) {
    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const coursesBought = [];
    const coursesFavorite = [];
    const skills = [];
    const points = 0;
    const profilePicture = null;

    const { changeUserDetails } = usePerson();

    const handleSubmit = async () => {
        if (name && jobTitle && company) {
            try {
                const auth = getAuth();
                const userId = auth.currentUser?.uid;
                if (userId) {
                    await setDoc(doc(db, 'users', userId), {
                        name,
                        jobTitle,
                        company,
                        coursesBought,
                        coursesFavorite,
                        skills,
                        points,
                        profilePicture,
                    }, { merge: true }); // Merge to update only specific fields
                    changeUserDetails({ name, jobTitle, company, coursesBought, coursesFavorite, skills, points, profilePicture });
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
        <SafeAreaView style={styles.safeView}>
            <View
                style={styles.container}
                // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.logo}>
                    <ShifterLogo width='250' height='125' />
                </View>
                <KeyboardAwareScrollView
                    style={styles.content}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollViewContent}

                >
                    <Text style={styles.title}>Enter Your Details</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputText}>Name</Text>
                        <TextInput
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputText}>Job Title</Text>
                        <TextInput
                            placeholder="Enter your job title"
                            value={jobTitle}
                            onChangeText={setJobTitle}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputText}>Company</Text>
                        <TextInput
                            placeholder="Enter your company"
                            value={company}
                            onChangeText={setCompany}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
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
        paddingTop: '20%',
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
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
