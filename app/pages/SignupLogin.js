
import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    ScrollView,
    Button,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, sendPasswordResetEmail, sendEmailVerification} from 'firebase/auth';
import {auth, db} from '../../firebaseConfig';
import ShifterLogo from "../../assets/ShifterLogo";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {usePerson} from "../PersonInformationContext";
import {doc, getDoc, setDoc} from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";

export default function SignupLogin({ navigation, onLogIn, onGuestEntry }) {
    const [signup, setSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const { fetchUserData, changeUserDetails, defaultUserState, lightTheme, lightBackground, darkBackground, textLightBackground, textDarkBackground } = usePerson();

    const handleSignup = async () => {
        setLoading(true);
        setError('');
        if (password===passwordConfirm) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                // changeUserDetails({ email: user.email });


                navigation.navigate('UserInfo');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Passwords need to be the same');
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


    const handleResetPassword = async () => {
        setLoading(true);
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                Alert.alert('Success','Email sent! Check your mail inbox to reset your password');
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Please enter you email address in the field so we can send you an email for resetting your password');
            setLoading(false);
        }
    }


    const handleGuestEntry = async () => {
        setLoading(true);
        try {
            const userCredential = await signInAnonymously(auth);
            const user = userCredential.user;

            console.log('Guest signed in:', user.uid);

            onGuestEntry();
        } catch (error) {
            console.error('Error with anonymous sign-in:', error);
            setError('Failed to enter as guest.');
        }
        finally {
            setLoading(false);
        }
    };


    return (
        loading ?
                <LoadingScreen isLightTheme={lightTheme}/> :
                <SafeAreaView style={[
                    styles.safeView,
                    {backgroundColor: lightTheme ? lightBackground : darkBackground}
                ]}>
                    <KeyboardAvoidingView
                        style={styles.container}
                        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <View style={styles.logo}>
                            <ShifterLogo width='250' height='125' color={!lightTheme ?  lightBackground : darkBackground} />
                        </View>
                        <KeyboardAwareScrollView
                            style={styles.content}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={styles.scrollViewContent}
                        >
                            <Text style={[
                                styles.title,
                                {color: lightTheme ? textLightBackground : textDarkBackground}
                            ]}>{signup ? 'Sign Up' : 'Log In'}</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={[
                                    styles.inputText,
                                    {color: lightTheme ? textLightBackground : textDarkBackground}
                                ]}>Email</Text>
                                <TextInput
                                    placeholder="Enter your email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    style={[
                                        styles.input,
                                        {color: lightTheme ? textLightBackground : textDarkBackground},
                                        {borderColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                        emailFocus && styles.inputFocus
                                    ]}
                                    onFocus={() => setEmailFocus(true) }
                                    onBlur={() => setEmailFocus(false)}
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={[
                                    styles.inputText,
                                    {color: lightTheme ? textLightBackground : textDarkBackground}
                                ]}>Password</Text>
                                {signup ?
                                    <TextInput
                                        placeholder="Enter your password"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        style={[
                                            styles.input,
                                            {color: lightTheme ? textLightBackground : textDarkBackground},
                                            {borderColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                            passwordFocus && styles.inputFocus
                                        ]}
                                        onFocus={() => setPasswordFocus(true) }
                                        onBlur={() => setPasswordFocus(false)}
                                    /> :
                                    <View style={styles.resetPassButtonWrapper} >
                                        <TextInput
                                            placeholder="Enter your password"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry
                                            autoCapitalize="none"
                                            style={[
                                                styles.input,
                                                {color: lightTheme ? textLightBackground : textDarkBackground},
                                                {borderColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                                passwordFocus && styles.inputFocus
                                            ]}
                                            onFocus={() => setPasswordFocus(true) }
                                            onBlur={() => setPasswordFocus(false)}
                                        />
                                        <TouchableOpacity style={styles.resetPassButton} onPress={handleResetPassword}>
                                            <Text style={[
                                                styles.resetPassButtonText,
                                                {color: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                            ]}>Forgot password?</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                            {signup &&
                                <View style={styles.inputWrapper}>
                                    <Text style={[
                                        styles.inputText,
                                        {color: lightTheme ? textLightBackground : textDarkBackground}
                                    ]}>Confirm Password</Text>
                                    <TextInput
                                        placeholder="Confirm password"
                                        value={passwordConfirm}
                                        onChangeText={setPasswordConfirm}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        style={[
                                            styles.input,
                                            {color: lightTheme ? textLightBackground : textDarkBackground},
                                            {borderColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                            confirmPasswordFocus && passwordConfirm!==password && {borderColor: '#aa0000'},
                                            confirmPasswordFocus && styles.inputFocus
                                        ]}
                                        onFocus={() => setConfirmPasswordFocus(true) }
                                        onBlur={() => setConfirmPasswordFocus(false)}
                                    />
                                </View>
                            }
                            <View style={styles.buttonWrapper}>
                                {error ? <Text style={styles.error}>{error}</Text> : null}
                                <TouchableOpacity style={[
                                    styles.button,
                                    {backgroundColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'}
                                ]} onPress={signup ? handleSignup : handleLogin} disabled={loading}>
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
                                        setEmail('');
                                        setPassword('');
                                        setPasswordConfirm('');
                                        setError('');
                                    }}
                                >
                                    <Text style={[
                                        styles.navButtonText,
                                        {color: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                    ]}>
                                        {signup ?
                                            'Already have an account? Log in' :
                                            'Don\'t have an account? Sign Up'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                        <TouchableOpacity
                            style={styles.enterGuest}
                            onPress={handleGuestEntry}
                        >
                            <Text style={[
                                styles.enterGuestText,
                                {color: lightTheme ? '#555' : '#aaa'},
                            ]}>Skip? Enter as guest</Text>
                        </TouchableOpacity>
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
        gap: 15,
        marginBottom: 30,
    },
    input: {
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
    resetPassButtonWrapper: {
        gap: 10,
    },
    resetPassButton: {

    },
    resetPassButtonText: {
        fontFamily: 'GothicA1-400',
        fontSize: 16,
    },
    buttonWrapper: {
        gap: 10,
        flex: 1,
    },
    button: {
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
        fontSize: 16,
    },
    enterGuest: {
        marginTop: 15,
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
    },
    enterGuestText: {
        fontFamily: 'GothicA1-500',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

