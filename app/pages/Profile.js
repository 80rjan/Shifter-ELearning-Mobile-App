import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import Header from '../elements/Header';
import { usePerson } from '../PersonInformationContext';
import PersonInfo from '../elements/PersonInfo';
import PersonRewards from '../elements/PersonRewards';
import PersonSkills from '../elements/PersonSkills';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust path as needed

export default function Profile({ onLogout }) {
    const { user } = usePerson();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            onLogout(); // Call the prop function to update `hasAccount` state in App.js
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerName='Profile' />
            <View style={styles.content}>
                <PersonInfo person={user} />
                <PersonRewards person={user} />
                <PersonSkills person={user} />
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    content: {
        gap: 30,
        ...Platform.select({
            android: {
                gap: 20,
            }
        }),
    },
    logoutButton: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',

        borderColor: '#00b5f0',
        borderWidth: 2,
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 20,
    },
    logoutText: {
        color: '#00b5f0',
        fontFamily: 'GothicA1-800',
        fontSize: 16,
        paddingBottom: 1,
    },
});
