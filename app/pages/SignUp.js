import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import ShifterLogo from "../../assets/ShifterLogo";

function Signup({ navigation, navigateToHome }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async () => {
        setLoading(true);
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered:', userCredential.user);
            navigateToHome(); // Call the prop function to navigate
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGuestEntry = () => {
        // Handle guest entry logic here
        navigateToHome(); // Call the prop function to navigate
    };

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <ShifterLogo width='250' height='125' />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Sign Up</Text>
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
                        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
                            <Text style={styles.buttonText}>
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.navButton}
                            onPress={() => navigation.navigate('LogIn')}
                        >
                            <Text style={styles.navButtonText}>Already have an account? Log in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.enterGuest}
                        >
                            <Text style={styles.enterGuestText}>Skip? Enter as guest</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        position: 'absolute',
        bottom: 0,
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

export default Signup;
