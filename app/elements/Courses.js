
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import Course from "./Course";
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import CourseDetails from "../pages/CourseDetails";
import {usePerson} from "../PersonInformationContext";
import {auth} from "../../firebaseConfig";

const Stack = createStackNavigator();

export default function Courses({title, allCourses, navigation, skillFiltering}) {
    const { lightTheme, textLightBackgorund, textDarkBackground } = usePerson();

    return (
        <View style={styles.coursesWrapper}>
            <Text style={[
                styles.heading,
                {color: lightTheme ? textLightBackgorund : textDarkBackground},
            ]}>{title}</Text>
            <ScrollView vertical showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {allCourses.length===0 && <Text style={[
                    styles.errorText,
                    {color: lightTheme ? textLightBackgorund : textDarkBackground},
                ]}>No courses to show {skillFiltering && `with this skill: ${skillFiltering}`}</Text>}
                {allCourses.map((course, index) => {
                    return <Course
                                   key={index}
                                   navigation={navigation}
                                   course={course}
                    />
                })}
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    coursesWrapper: {
        flex: 1,
        paddingHorizontal: 20,
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