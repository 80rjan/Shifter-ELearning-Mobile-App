import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Platform} from 'react-native';
import { usePerson } from '../PersonInformationContext'; // Import the context hook
import Header from "../elements/Header";
import Topics from "../elements/Topics";
import Courses from "../elements/Courses";
import LoadingScreen from "./LoadingScreen";
import {auth} from "../../firebaseConfig";
import {deleteUser} from "firebase/auth";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function Learn({ navigation }) {
    const { user, setHasAccount, loading, setLoading, error, lightTheme, lightBackground, darkBackground } = usePerson(); // Use the context hook to get person data
    const [filteredCourses, setFilteredCourses] = useState(user.coursesBought);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const insets = useSafeAreaInsets();
    const isAnonymous = auth.currentUser?.isAnonymous;

    useEffect(() => {
        setFilteredCourses(user.coursesBought);
    }, [user.coursesBought])


    const handleFilter = (skill) => {
        if (selectedSkill === skill) {
            // If the skill is already selected, clear the filter
            setFilteredCourses(user.coursesBought);
            setSelectedSkill(null);
        } else {
            // Filter courses based on the selected skill
            const filtered = user.coursesBought.filter(course => course.skills.includes(skill));
            setFilteredCourses(filtered);
            setSelectedSkill(skill);
        }
    };

    const showAlert = () => {
        Alert.alert(
            'Are you sure you want to continue?',
            'You will be redirected to a page to sign up or log in. Your progress as a guest will be lost',
            [
                { text: 'No', style: 'destructive' },
                { text: 'Yes', style: 'default', onPress: handleLogOutGuest },
            ]
        );
    };

    const handleLogOutGuest = async () => {
        setLoading(true);
        await deleteUser(auth.currentUser);
        setHasAccount(false);
        setLoading(true);
    }

    if (loading) {
        return <LoadingScreen isLightTheme={lightTheme}/>
    }

    if (error) {
        return <View style={{flex: 1, justifyContent: 'center'}} >
            <Text style={{alignSelf: 'center', fontFamily: 'GothicA1-500', fontSize: 24}} >Error Loading Data</Text>
        </View> ; // Display an error message if needed
    }

    if (isAnonymous) {
        return (
            <View style={[
                styles.container,
                { backgroundColor: lightTheme ? lightBackground : darkBackground },
                {
                    paddingTop: insets.top,
                }
            ]} >
                <Header headerName='Learn' />
                <TouchableOpacity style={[
                    styles.guestButtonRegister,
                    {backgroundColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'}
                ]} onPress={showAlert}>
                    <Text style={styles.guestButtonRegisterText} >Sign Up or Log In to purchase courses</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={[
            styles.container,
            { backgroundColor: lightTheme ? lightBackground : darkBackground },
            {
                paddingTop: insets.top,
            }
        ]} >
            <Header headerName='Learn' />
            <View style={styles.content}>
                {/*<Topics courses={user.coursesBought} handleFilter={handleFilter} selectedSkill={selectedSkill} />*/}
                <Courses title={'Learning Dashboard'} courses={filteredCourses} navigation={navigation} skillFiltering={selectedSkill} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    guestButtonRegister: {
        alignSelf: 'center',
        borderRadius: 5,
        paddingVertical: 16,
        paddingHorizontal: 8,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.4,
        shadowColor: 'black',
        shadowRadius: 2,
        width: '80%',

        ...Platform.select({
            android: {
                paddingVertical: 8,
            }
        })
    },
    guestButtonRegisterText: {
        fontFamily: 'GothicA1-600',
        fontSize: 22,
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center',

        ...Platform.select({
            android: {
                fontSize: 20,
            }
        })
    },
    content: {
        flex: 1,
        gap: 30,
    },
});
