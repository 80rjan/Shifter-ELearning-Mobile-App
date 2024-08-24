import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useFonts from "./app/elements/UseFonts";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';

import StackCourseDetails from "./app/pages/StackCourseDetails";
import Home from "./app/pages/Home";
import Wishlist from "./app/pages/Wishlist";
import Learn from "./app/pages/Learn";
import Profile from "./app/pages/Profile";
import LoadingScreen from "./app/pages/LoadingScreen";
import {PersonProvider, usePerson} from "./app/PersonInformationContext";
import SignupLogin from "./app/pages/SignupLogin";
import UserInfo from "./app/pages/UserInfo";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'Courses') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Wishlist') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Learn') {
                        iconName = focused ? 'school' : 'school-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={25} color={color} />;
                },
                tabBarActiveTintColor: '#00b5f0',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    height: 85,
                    ...Platform.select({
                        android: {
                            height: 60,
                            paddingBottom: 5,
                        },
                    }),
                },
                tabBarLabel: ({ focused, color }) => (
                    <Text style={{
                        fontSize: 14,
                        fontWeight: focused ? 'bold' : 'normal',
                        color: color,
                    }}>
                        {route.name}
                    </Text>
                ),
            })}
        >
            <Tab.Screen name="Courses">
                {() => <StackCourseDetails Component={Home} />}
            </Tab.Screen>
            <Tab.Screen name="Wishlist">
                {() => <StackCourseDetails Component={Wishlist} />}
            </Tab.Screen>
            <Tab.Screen name="Learn">
                {() => <StackCourseDetails Component={Learn} />}
            </Tab.Screen>
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

function AuthStack({ changeUserDetails, setHasAccount }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
                {(props) => (
                    <SignupLogin
                        {...props}
                        onLogIn={() => setHasAccount(true)}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="UserInfo">
                {(props) => (
                    <UserInfo
                        {...props}
                        changeUserDetails={changeUserDetails}
                        onUserInfoComplete={() => setHasAccount(true)}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}



function AppNavigator() {
    const { user, changeUserDetails } = usePerson();
    const [hasAccount, setHasAccount] = useState(false); // Track if user is signing up

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!hasAccount ? (
                <Stack.Screen name="Auth">
                    {(props) => (
                        <AuthStack
                            {...props}
                            changeUserDetails={changeUserDetails}
                            user={user}
                            setHasAccount={setHasAccount} // Pass the flag to AuthStack
                        />
                    )}
                </Stack.Screen>
            ) : (
                // If user is logged in and has completed UserInfo
                <Stack.Screen name="Main" component={TabNavigator} />
            )}
        </Stack.Navigator>
    );
}



export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const fontsLoaded = useFonts();

    useEffect(() => {
        if (fontsLoaded) {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [fontsLoaded]);

    if (isLoading) return <LoadingScreen />;

    return (
        <PersonProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </PersonProvider>
    );
}
