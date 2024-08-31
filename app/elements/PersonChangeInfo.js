import {usePerson} from "../PersonInformationContext";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    ScrollView, Keyboard, Alert, ActivityIndicator
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useRef, useState} from "react";
import { updateProfile, updateEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {db} from '../../firebaseConfig';


export default function PersonChangeInfo({setIsChangingInfo}) {
    const { user, fetchUserData, lightTheme, lightBackground, darkBackground, textLightBackground, textDarkBackground, fetch} = usePerson();
    const [newName, setNewName] = useState(user.name);
    const [newJobTitle, setNewJobTitle] = useState(user.jobTitle);
    const [newCompany, setNewCompany] = useState(user.company);
    const [newEmail, setNewEmail] = useState(user.email);
    const [isLoading, setIsLoading] = useState(false);
    const borderColor = '#00b5f0';

    const handleDiscard = () => {
        setIsChangingInfo(false);
    }

    const handleNewInformation = async () => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        const currentUser = auth.currentUser;

        if (userId && currentUser) {
            try {
                setIsLoading(true);
                // Update Firestore with new information
                await updateDoc(doc(db, 'users', userId), {
                    name: newName,
                    jobTitle: newJobTitle,
                    company: newCompany,
                });

                // Update email in Firebase Authentication
                // if (newEmail !== currentUser.email) {
                //     await updateEmail(currentUser, newEmail);
                //     await updateDoc(doc(db, 'users', userId), {
                //         email: newEmail,
                //     })
                // }

                // Update profile display name
                // await updateProfile(currentUser, {
                //     displayName: newName,
                // });

                // Fetch updated user data from Firestore and update app state
                await fetchUserData(userId);

                // Provide feedback to the user (e.g., success message)
                Alert.alert('Success', 'Your information has been updated!');

            } catch (error) {
                console.error('Error updating user information: ', error);
                Alert.alert('Error', `Failed to update information: ${error.message}`);
            }
            finally {
                setIsChangingInfo(false);
                setIsLoading(false);
            }
        } else {
            Alert.alert('Error', 'No user is currently logged in.');
        }
    }


    return (
        isLoading ?
            <View style={{flex: 1, justifyContent: 'center'}} >
                <ActivityIndicator size='large' color='#00b5f0' />
            </View> :
        <View
            style={styles.container}
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <KeyboardAwareScrollView
                // ref={scrollRef}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                bottomOffset={0}
            >
                <View style={styles.inputWrapper}>
                    <Text style={[
                        styles.inputText,
                        {color: lightTheme ? textLightBackground : textDarkBackground}
                    ]}>Name</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {color: lightTheme ? textLightBackground : textDarkBackground},
                            {borderColor: borderColor},
                        ]}
                        value={newName}
                        onChangeText={setNewName}
                        autoCapitalize='words'
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={[
                        styles.inputText,
                        {color: lightTheme ? textLightBackground : textDarkBackground}
                    ]}>Job Title</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {color: lightTheme ? textLightBackground : textDarkBackground},
                            {borderColor: borderColor},
                        ]}
                        value={newJobTitle}
                        onChangeText={setNewJobTitle}
                        autoCapitalize='words'
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={[
                        styles.inputText,
                        {color: lightTheme ? textLightBackground : textDarkBackground}
                    ]}>Company</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {color: lightTheme ? textLightBackground : textDarkBackground},
                            {borderColor: borderColor},
                        ]}
                        value={newCompany}
                        onChangeText={setNewCompany}
                        autoCapitalize='words'
                    />
                </View>
                {/*<View style={styles.inputWrapper}>*/}
                {/*    <Text style={[*/}
                {/*        styles.inputText,*/}
                {/*        {color: lightTheme ? textLightBackground : textDarkBackground}*/}
                {/*    ]}>Email</Text>*/}
                {/*    <TextInput*/}
                {/*        style={[*/}
                {/*            styles.input,*/}
                {/*            {color: lightTheme ? textLightBackground : textDarkBackground},*/}
                {/*            {borderColor: borderColor},*/}
                {/*        ]}*/}
                {/*        value={newEmail}*/}
                {/*        onChangeText={setNewEmail}*/}
                {/*        autoCapitalize='none'*/}
                {/*        keyboardType='email-address'*/}
                {/*    />*/}
                {/*</View>*/}
            </KeyboardAwareScrollView>
            <View style={[
                styles.buttonWrapper,
                {backgroundColor: lightTheme ? lightBackground : darkBackground}
            ]}>
                <TouchableOpacity style={[
                    styles.button,
                    {borderColor: lightTheme ? '#777' : '#999'}
                ]} onPress={handleDiscard}>
                    <Text style={[
                        styles.buttonText,
                        {color: lightTheme ? '#777' : '#999'}
                    ]}>Discard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[
                    styles.button,
                    {borderColor: borderColor},
                ]} onPress={handleNewInformation}>
                    <Text style={[
                        styles.buttonText,
                        {color: '#00b5f0'},
                    ]}>Save New Information</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollView: {
        flex: 1,
        // marginBottom: 20,
    },
    inputWrapper: {
        width: '100%',
        gap: 10,
        marginBottom: 15,
    },
    input: {
        borderWidth: 2,
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
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        gap: 10,
        width: '100%',
        paddingTop: 20,
    },
    button: {
        borderWidth: 2,
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 10,
    },
    buttonText: {
        fontFamily: 'GothicA1-800',
        fontSize: 16,
        paddingBottom: 1,
    },
})