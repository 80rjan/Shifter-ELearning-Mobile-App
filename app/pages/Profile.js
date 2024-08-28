import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity, Alert} from 'react-native';
import Header from '../elements/Header';
import { usePerson } from '../PersonInformationContext';
import PersonInfo from '../elements/PersonInfo';
import PersonRewards from '../elements/PersonRewards';
import PersonSkills from '../elements/PersonSkills';
import { getAuth, signOut, deleteUser } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function Profile({ onLogout }) {
    const { user, lightTheme, lightBackground, darkBackground } = usePerson();
    const isAnonymous = auth.currentUser?.isAnonymous;

    const showAlert = () => {
        Alert.alert(
            'Are you sure you want to logout?',
            '',
            [
                { text: 'Yes', style: 'destructive', onPress: handleLogout },
                { text: 'No', style: 'default' },
            ]
        );
    };

    const handleLogout = async () => {
        try {
            if (isAnonymous) {
                await deleteUser(auth.currentUser);
            } else {
                await signOut(auth);
            }
            onLogout(); // Call the prop function to update `hasAccount` state in App.js and navigate
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <SafeAreaView style={[
            styles.container,
            {backgroundColor: lightTheme ? lightBackground : darkBackground}
        ]}>
            <Header headerName='Profile' />
            <View style={styles.content}>
                <PersonInfo person={user} />
                <PersonRewards person={user} />
                <PersonSkills person={user} />
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={showAlert}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
