import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import CourseDetails from "./CourseDetails";
import Home from './Home';
import Wishlist from "./Wishlist";
import Learn from "./Learn";
import ShifterMiniLogo from "../../assets/Shifter Mini Logo";

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
                options={({ navigation }) => ({
                    headerTitle: '',
                    headerRight: '',
                    // headerRight: () => (
                    //     <Text style={styles.headerLogo}>Shifter Logo</Text>
                    // ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackWrapper}>
                            {/*<Image*/}
                            {/*    source={require('./../../assets/Shifter-MiniLogo.png')}*/}
                            {/*    style={styles.headerImage}*/}
                            {/*/>*/}
                            <ShifterMiniLogo />
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
