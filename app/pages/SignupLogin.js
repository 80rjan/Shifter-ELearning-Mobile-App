
import React, { useState } from 'react';
import {View, TextInput, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../../firebaseConfig';
import ShifterLogo from "../../assets/ShifterLogo";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {usePerson} from "../PersonInformationContext";
import {doc, getDoc, setDoc} from "firebase/firestore";

export default function SignupLogin({ navigation, navigateAsGuest, onLogIn }) {
    const [signup, setSignup] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { fetchUserData, changeUserDetails, defaultUserState } = usePerson();

    const handleSignup = async () => {
        setLoading(true);
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            changeUserDetails({ email: user.email });
            navigation.navigate('UserInfo');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Update user context with fetched data
                changeUserDetails(userData);
            } else {
                console.log('No such document! Setting default user data.');
                await setDoc(doc(db, 'users', user.uid), defaultUserState); // Set default user state
                changeUserDetails(defaultUserState);
            }

            onLogIn(); // Navigate to home or handle post-login logic
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };



    const handleGuestEntry = () => {
        navigateAsGuest();
    };

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <ShifterLogo width='250' height='125' />
                </View>
                <KeyboardAwareScrollView
                    style={styles.content}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <Text style={styles.title}>{signup ? 'Sign Up' : 'Log In'}</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputText}>Email</Text>
                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputText}>Password</Text>
                        <TextInput
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        {error ? <Text style={styles.error}>{error}</Text> : null}
                        <TouchableOpacity style={styles.button} onPress={signup ? handleSignup : handleLogin} disabled={loading}>
                            <Text style={styles.buttonText}>
                                {loading ?
                                    (signup ? 'Signing Up...' : 'Logging in') :
                                    (signup ? 'Sign Up' : 'Log In')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.navButton}
                            onPress={() => {
                                setSignup(!signup);
                                setPassword('');
                                setEmail('');
                                setError('');
                            }}
                        >
                            <Text style={styles.navButtonText}>
                                {signup ?
                                    'Already have an account? Log in' :
                                    'Don\'t have an account? Sign Up'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.enterGuest}
                            onPress={handleGuestEntry}
                        >
                            <Text style={styles.enterGuestText}>Skip? Enter as guest</Text>
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
    navButton: {
        alignItems: 'center',
        marginTop: 5,
    },
    navButtonText: {
        color: '#00b5f0',
        fontSize: 16,
    },
    enterGuest: {
        marginTop: 15,
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        // position: 'absolute',
        // bottom: 0,
    },
    enterGuestText: {
        color: '#666',
        fontFamily: 'GothicA1-400',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

