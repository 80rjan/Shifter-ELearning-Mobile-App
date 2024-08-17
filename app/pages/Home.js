import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {useState} from "react";
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
        <SafeAreaView style={styles.container}>
            <Header headerName='Courses' />
            <View style={styles.content}>
                <Topics courses={filteredCourses} handleFilter={handleFilter} selectedSkill={selectedSkill} />
                <Courses title={'Explore '} allCourses={filteredCourses} navigation={navigation} skillFiltering={selectedSkill}/>
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
