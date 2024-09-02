
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import Course from "./Course";
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import CourseDetails from "../pages/CourseDetails";
import {usePerson} from "../PersonInformationContext";
import {auth} from "../../firebaseConfig";

const Stack = createStackNavigator();

export default function CoursesRecommended({title, navigation, courses}) {
    const { lightTheme, textLightBackground, textDarkBackground } = usePerson();

    return (
        <View style={styles.coursesWrapper}>
            <Text style={[
                styles.heading,
                {color: lightTheme ? textLightBackground : textDarkBackground},
            ]}>{title}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}>

                {courses.map((course, index) => {
                    return <Course
                        key={index}
                        navigation={navigation}
                        course={course}
                        isRecommendation={true}
                    />
                })}
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    coursesWrapper: {
        gap: 20,

        ...Platform.select({
            android: {
                gap: 10,
            }
        })
    },
    scrollView: {

    },
    heading: {
        fontFamily: 'GothicA1-700',
        fontSize: 24,

        ...Platform.select({
            android: {
                fontSize: 22,
            }
        })
    },
    errorText: {
        fontFamily: 'GothicA1-500',
        fontSize: 22,
        alignSelf: 'center',
    }
})