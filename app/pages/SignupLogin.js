
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
import Ionicons from "react-native-vector-icons/Ionicons";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function SignupLogin({ navigation, onLogIn, onGuestEntry }) {
    const [signup, setSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [passVisible, setPassVisible] = useState(false);
    const insets = useSafeAreaInsets();

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

                await sendEmailVerification(user);

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
        <View style={[
            styles.safeView,
            {backgroundColor: lightTheme ? lightBackground : darkBackground},
            {
                paddingTop: insets.top,
            }
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
                            placeholderTextColor={lightTheme ? '#aaa' : '#555'}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={[
                                styles.input,
                                styles.textInput,
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
                            <View
                                style={[
                                    styles.input,
                                    {borderColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                    passwordFocus && styles.inputFocus
                                ]}
                            >
                                <TextInput
                                    placeholder="Enter your password"
                                    placeholderTextColor={lightTheme ? '#aaa' : '#555'}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!passVisible}
                                    autoCapitalize="none"
                                    style={[
                                        styles.textInput,
                                        {color: lightTheme ? textLightBackground : textDarkBackground}
                                    ]}
                                    onFocus={() => setPasswordFocus(true) }
                                    onBlur={() => setPasswordFocus(false)}
                                />
                                <TouchableOpacity
                                    onPress={() => setPassVisible(!passVisible)}
                                >
                                    <Ionicons
                                        name={passVisible ? 'eye-outline' : 'eye-off-outline'}
                                        size={24}
                                        color={lightTheme ? '#aaa' : '#555'}
                                    />
                                </TouchableOpacity>
                            </View> :
                            <View style={styles.resetPassButtonWrapper} >
                                <View
                                    style={[
                                        styles.input,
                                        {borderColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                        passwordFocus && styles.inputFocus
                                    ]}
                                >
                                    <TextInput
                                        placeholder="Enter your password"
                                        placeholderTextColor={lightTheme ? '#aaa' : '#555'}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!passVisible}
                                        autoCapitalize="none"
                                        style={[
                                            styles.textInput,
                                            {color: lightTheme ? textLightBackground : textDarkBackground},
                                        ]}
                                        onFocus={() => setPasswordFocus(true) }
                                        onBlur={() => setPasswordFocus(false)}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setPassVisible(!passVisible)}
                                    >
                                        <Ionicons
                                            name={passVisible ? 'eye-outline' : 'eye-off-outline'}
                                            size={24}
                                            color={lightTheme ? '#aaa' : '#555'}
                                        />
                                    </TouchableOpacity>
                                </View>
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
                                placeholderTextColor={lightTheme ? '#aaa' : '#555'}
                                value={passwordConfirm}
                                onChangeText={setPasswordConfirm}
                                secureTextEntry={!passVisible}
                                autoCapitalize="none"
                                style={[
                                    styles.input,
                                    styles.textInput,
                                    {color: lightTheme ? textLightBackground : textDarkBackground},
                                    {borderColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'},
                                    passwordConfirm!==password && {borderColor: '#aa0000'},
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
                                setPassVisible(false);
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
            </KeyboardAvoidingView>
            {!emailFocus && !passwordFocus && !confirmPasswordFocus &&
                <TouchableOpacity
                    style={[
                        styles.enterGuest,
                        {bottom: insets.bottom}
                    ]}
                   onPress={handleGuestEntry}
                >
                    <Text style={[
                        styles.enterGuestText,
                        {color: lightTheme ? '#555' : '#aaa'},
                    ]}>Skip? Enter as guest</Text>
                </TouchableOpacity>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    safeView: {
        flex: 1,
    },
    container: {
        paddingTop: '10%',
        flex: 1,
    },
    logo: {
        alignItems: 'center',
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
        fontFamily: 'GothicA1-600',
        fontSize: 24,
        paddingBottom: 1,
        alignSelf: 'center',
        marginBottom: 20,
    },
    inputWrapper: {
        gap: 16,
        marginBottom: 30,

        ...Platform.select({
            android: {
                gap: 8,
                marginBottom: 20,
            }
        })
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 13,

        ...Platform.select({
            android: {
                paddingVertical: 8,
            }
        })
    },
    textInput: {
        flex: 1,
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
        ...Platform.select({
            android: {
                gap: 4,
            }
        })
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

        ...Platform.select({
            android: {
                gap: 4,
            }
        })
    },
    button: {
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

        ...Platform.select({
            android: {
                fontSize: 18,
            }
        })
    },
    navButton: {
        alignItems: 'center',
        marginTop: 5,
    },
    navButtonText: {
        fontSize: 16,
    },
    enterGuest: {
        marginBottom: 10,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
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

