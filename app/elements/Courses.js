
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import Course from "./Course";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import CourseDetails from "../pages/CourseDetails";
import {usePerson} from "../PersonInformationContext";

const Stack = createStackNavigator();

export default function Courses({title, allCourses, navigation, skillFiltering}) {
    const { user } = usePerson();

    return (
        <View style={styles.coursesWrapper}>
            <Text style={[styles.heading, {color: '#202020'}]}>{title}</Text>
            <ScrollView vertical showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {allCourses.length===0 && <Text style={styles.errorText}>{user.name==='Guest' ? 'Log In or Sign Up to purchase courses' : `No courses to show ${skillFiltering && `with this skill: ${skillFiltering}`}`}</Text>}
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
        flexDirection: 'column',
        gap: 20,

        ...Platform.select({
            android: {
                gap: 10,
            }
        })
    },
    scrollView: {
        paddingHorizontal: 5,
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