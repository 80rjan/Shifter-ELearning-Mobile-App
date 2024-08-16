
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Navbar from "../elements/Navbar";
import Header from "../elements/Header";
import Topics from "../elements/Topics";
import Courses from "../elements/Courses";
import {usePerson} from "../PersonInformationContext";
import allCoursesDetails from "../AllCoursesDetails";


export default function Home({navigation}) {
    const { person } = usePerson();
    const coursesBought = person.coursesBought;
    const courses = allCoursesDetails.filter(course =>
        !coursesBought.some(boughtCourse => boughtCourse.title === course.title)
    );


    return (
        <SafeAreaView style={styles.container}>
            <Header headerName='Courses' />
            <View style={styles.content}>
                <Topics />
                <Courses title={'Explore '} allCourses={courses} navigation={navigation}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    content: {
        flex: 1,
        gap: 30,
    },
});
