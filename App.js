import React, { useEffect, useState } from 'react';
import {Platform, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SafeAreaProvider} from "react-native-safe-area-context";
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

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import expoSystemUI from "expo-system-ui/src/ExpoSystemUI";

function TabNavigator() {
    const insets = useSafeAreaInsets();
    const { user, setHasAccount, lightTheme, lightBackground, darkBackground }= usePerson();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Education') {
                        iconName = focused ? 'school' : 'school-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={Platform.OS === 'ios' ? 26 : 22} color={color} />;
                },
                tabBarActiveTintColor: !lightTheme ? lightBackground : darkBackground,
                tabBarInactiveTintColor: lightTheme ? '#888' : '#777',
                tabBarStyle: {
                    backgroundColor: lightTheme ? lightBackground : darkBackground,
                    borderTopWidth: 0,
                    shadowOffset: { width: 0, height: -1 },
                    shadowColor: 'black',
                    shadowRadius: 1,
                    shadowOpacity: 0.3,
                    paddingBottom: insets.bottom,


                    ...Platform.select({
                        android: {
                            borderTopColor: lightTheme ? '#ddd' : '#333',
                            borderTopWidth: 1,
                            elevation: 3,
                            // height: 65,
                            paddingBottom: insets.bottom,
                        },
                    }),
                },
                tabBarBadgeStyle: {
                    backgroundColor: '#00b5f0',
                    color: 'white',
                },
                tabBarLabel: ({ focused, color }) => (
                    !focused ? null :
                    <Text style={{
                        fontSize: 12,
                        fontFamily: 'GothicA1-600',
                        color: color,
                    }}>
                        {route.name}
                    </Text>
                ),
            })}
        >
            <Tab.Screen name="Home">
                {() => <StackCourseDetails Component={Home} />}
            </Tab.Screen>
            <Tab.Screen name="Favorites" options={{tabBarBadge: user.coursesFavorite.length > 0 ? user.coursesFavorite.length : null}}>
                {() => <StackCourseDetails Component={Wishlist} />}
            </Tab.Screen>
            <Tab.Screen name="Education">
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
        <SafeAreaProvider>
            <PersonProvider>
                <NavigationContainer>
                    <AppNavigator style={{backgroundColor: 'red'}}/>
                </NavigationContainer>
            </PersonProvider>
        </SafeAreaProvider>
    );
}
