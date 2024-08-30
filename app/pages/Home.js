import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {useEffect, useState} from "react";
import Header from "../elements/Header";
import Topics from "../elements/Topics";
import Courses from "../elements/Courses";
import {usePerson} from "../PersonInformationContext";
import allCoursesDetails from "../AllCoursesDetails";



export default function Home({navigation}) {
    const { user, lightTheme, lightBackground, darkBackground } = usePerson();

    const courses = allCoursesDetails.filter(course =>
        !user.coursesBought.some(boughtCourse => boughtCourse.title === course.title)
    );

    // useEffect(() => {
    //     console.log('User data in Home component:', user);
    // }, [user]);


    const [filteredCourses, setFilteredCourses] = useState(courses);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const handleFilter = (skill) => {
        if (selectedSkill === skill) {
            // If the skill is already selected, clear the filter
            setFilteredCourses(courses);
            setSelectedSkill(null);
        } else {
            // Filter courses based on the selected skill
            const filtered = courses.filter(course => course.skills.includes(skill));
            setFilteredCourses(filtered);
            setSelectedSkill(skill);
        }
    };

    return (
        <SafeAreaView style={[
            styles.container,
            { backgroundColor: lightTheme ? lightBackground : darkBackground },
        ]}>
            <Header headerName='Courses' />
            <View style={styles.content}>
                <Topics courses={courses} handleFilter={handleFilter} selectedSkill={selectedSkill} />
                <Courses title={'Discover'} allCourses={filteredCourses} navigation={navigation} skillFiltering={selectedSkill}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        gap: 30,
    },
});
