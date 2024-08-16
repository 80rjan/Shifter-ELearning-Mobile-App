import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import CourseDetails from "./CourseDetails";
import Home from './Home';
import Wishlist from "./Wishlist";
import Learn from "./Learn";

const Stack = createStackNavigator();

export default function StackCourseDetails({ Component }) {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                gestureDirection: 'vertical',
                cardStyle: styles.card,
            }}
        >
            <Stack.Screen
                name={Component.name}
                component={Component}
                options={{ headerShown: false }} // Disable header on the component screen
            />
            <Stack.Screen
                name="CourseDetails"
                component={CourseDetails}
                options={{
                    headerTitle: '',
                    headerRight: () => (
                        <Text style={styles.headerLogo}>Shifter Logo</Text>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerLogo: {
        fontSize: 30,
        fontWeight: '800',
        color: '#00b5f0',
        paddingRight: 20,
    },
});
