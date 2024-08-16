
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Course from "./Course";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import CourseDetails from "../pages/CourseDetails";

const Stack = createStackNavigator();

export default function Courses({title, allCourses, navigation}) {

    return (
        <View style={styles.coursesWrapper}>
            <Text style={[styles.heading, {color: '#202020'}]}>{title}</Text>
            <ScrollView vertical showsVerticalScrollIndicator={false} style={styles.scrollView}>
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
    },
    scrollView: {
        paddingHorizontal: 5,
    },
    heading: {
        fontFamily: 'GothicA1-700',
        fontSize: 28,
    },
})