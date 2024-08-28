import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import CourseDetails from "./CourseDetails";
import Home from './Home';
import Wishlist from "./Wishlist";
import Learn from "./Learn";
import ShifterMiniLogo from "../../assets/Shifter Mini Logo";
import {Easing} from "react-native";
import {usePerson} from "../PersonInformationContext";

const Stack = createStackNavigator();

export default function StackCourseDetails({ Component }) {
    const {lightTheme, lightBackground, darkBackground} = usePerson();

    return (
        <Stack.Navigator
            screenOptions={{
                transitionSpec: {
                    open: {
                        animation: 'timing',
                        config: {
                            duration: 500,
                            easing: Easing.inOut(Easing.ease),
                            delay: 100,
                        },
                    },
                    close: {
                        animation: 'timing',
                        config: {
                            duration: 300,
                            easing: Easing.in(Easing.ease),
                        },
                    },
                },
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
                options={({ navigation }) => ({
                    headerTitle: '',
                    headerRight: '',
                    headerStyle: {
                        backgroundColor: lightTheme ? lightBackground : darkBackground,
                        borderBottomWidth: 0,
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackWrapper}>
                            {Platform.OS==='ios' ?
                                <ShifterMiniLogo width='80' height='40' /> :
                                <ShifterMiniLogo width='70' height='34.6' /> }
                        </TouchableOpacity>
                    )
                })}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    goBackWrapper: {
        marginLeft: 10,
        transform: [{scaleY: 0.8}],
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 2,
        shadowOpacity: 0.3,
        elevation: 1,
    },
    headerImage: {

    }
});
