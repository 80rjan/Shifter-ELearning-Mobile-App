import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useFonts from "./app/elements/UseFonts";

import StackCourseDetails from "./app/pages/StackCourseDetails";
import Home from "./app/pages/Home";
import Wishlist from "./app/pages/Wishlist";
import Learn from "./app/pages/Learn";
import Profile from "./app/pages/Profile";
import CourseDetails from "./app/pages/CourseDetails";

import {PersonProvider} from "./app/PersonInformationContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



export default function App() {
    const fontsLoaded=useFonts()

    if (!fontsLoaded) {
        return (<Text >Loading Fonts...</Text>);
    }

    return (
        <PersonProvider >
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        headerStyle: styles.header,
                        headerTitle: '',
                        headerLeft: () => (
                            <Text style={styles.headerTitle}>{route.name}</Text>
                        ),
                        headerRight: () => (
                            <Text style={styles.headerLogo}>Shifter Logo</Text>
                        ),
                        tabBarIcon: ({ focused, color, size }) => {
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

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#00b5f0',
                        tabBarInactiveTintColor: '#888',
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
            </NavigationContainer>
        </PersonProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 0,
        elevation: 0, // Removes the shadow on Android
        shadowOpacity: 0, // Removes the shadow on iOS
    },
    headerTitle: {
        fontSize: 40,
        fontWeight: '700',
        color: '#333',
        paddingLeft: 20,
        paddingRight: 0,
    },
    headerLogo: {
        fontSize: 30,
        fontWeight: '800',
        color: '#00b5f0',
        paddingRight: 20,
    },
    courseDetails: {

    }
});
