import React, { useEffect, useState } from 'react';
import {Platform, StyleSheet, Text, useColorScheme, View} from 'react-native';
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
import ShifterLogo from "./assets/ShifterLogo";
import {PersonProvider, usePerson} from "./app/PersonInformationContext";
import SignupLogin from "./app/pages/SignupLogin";
import UserInfo from "./app/pages/UserInfo";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
    const { user, setHasAccount, lightTheme, lightBackground, darkBackground }= usePerson();
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
                    backgroundColor: lightTheme ? lightBackground : darkBackground,
                    borderTopWidth: 0,
                    shadowOffset: {width: 0, height: -1},
                    shadowColor: 'black',
                    shadowRadius: 1,
                    shadowOpacity: 0.3,
                    ...Platform.select({
                        android: {
                            height: 60,
                            paddingBottom: 5,
                        },
                    }),
                },
                tabBarBadgeStyle: {
                    backgroundColor: '#00b5f0',
                    color: 'white',
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
            <Tab.Screen name="Wishlist" options={{tabBarBadge: user.coursesFavorite.length>0 ? user.coursesFavorite.length : null}}>
                {() => <StackCourseDetails Component={Wishlist} />}
            </Tab.Screen>
            <Tab.Screen name="Learn">
                {() => <StackCourseDetails Component={Learn} />}
            </Tab.Screen>
            <Tab.Screen name="Profile">
                {(props) => <Profile {...props} onLogout={() => setHasAccount(false)} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}


function AuthStack() {
    const { setHasAccount }= usePerson();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginSignup">
                {(props) => (
                    <SignupLogin
                        {...props}
                        onLogIn={() => setHasAccount(true)}
                        onGuestEntry={() => setHasAccount(true)}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="UserInfo">
                {(props) => (
                    <UserInfo
                        {...props}
                        onUserInfoComplete={() => setHasAccount(true)}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}


function AppNavigator() {
    const { user, hasAccount, setHasAccount } = usePerson();

    useEffect(() => {
        const checkUserStatus = () => {
            if (auth.currentUser?.isAnonymous) {
                setHasAccount(true); // Set the flag to true for guest users
            }
        };

        checkUserStatus();
    }, []);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!hasAccount ? (
                <Stack.Screen name="Auth" component={AuthStack} />
            ) : (
                <Stack.Screen name="Main" component={TabNavigator}/>
            )}
        </Stack.Navigator>
    );
}


export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const fontsLoaded = useFonts();
    const isLightTheme = useColorScheme();

    useEffect(() => {
        if (fontsLoaded) {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [fontsLoaded]);

    if (isLoading) return <LoadingScreen isLightTheme={isLightTheme==='light'} />;

    return (
        <PersonProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </PersonProvider>
    );
}
