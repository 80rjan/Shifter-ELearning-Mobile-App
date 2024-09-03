import {StyleSheet, Text, View, SafeAreaView, Platform} from 'react-native';
import {useEffect, useState} from "react";
import Header from "../elements/Header";
import Topics from "../elements/Topics";
import Courses from "../elements/Courses";
import {usePerson} from "../PersonInformationContext";
import allCoursesDetails from "../AllCoursesDetails";
import {useSafeAreaInsets} from "react-native-safe-area-context";


export default function Home({navigation}) {
    const { allCourses, user, lightTheme, lightBackground, darkBackground } = usePerson();
    const insets = useSafeAreaInsets();

    const courses = allCourses.filter(course =>
        !user.coursesBought.some(boughtCourse => boughtCourse.title === course.title)
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
        <View style={[
            styles.container,
            { backgroundColor: lightTheme ? lightBackground : darkBackground },
            {
                paddingTop: insets.top,
            }
        ]}>
            <Header headerName='Courses' />
            <View style={styles.content}>
                {courses.length>0 &&
                    <Topics courses={courses} handleFilter={handleFilter} selectedSkill={selectedSkill} />
                }
                <Courses title={'Discover'} courses={filteredCourses} navigation={navigation} skillFiltering={selectedSkill}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        gap: 32,

        ...Platform.select({
            android: {
                gap: 16,
            }
        })
    },
});
