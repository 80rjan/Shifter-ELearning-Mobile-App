import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { usePerson } from '../PersonInformationContext'; // Import the context hook
import Header from "../elements/Header";
import Topics from "../elements/Topics";
import Courses from "../elements/Courses";

export default function Learn({ navigation }) {
    const { person } = usePerson(); // Use the context hook to get person data
    const yourCourses = person.coursesBought; // Get bought courses from context

    const [filteredCourses, setFilteredCourses] = useState(yourCourses);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const handleFilter = (skill) => {
        if (selectedSkill === skill) {
            // If the skill is already selected, clear the filter
            setFilteredCourses(yourCourses);
            setSelectedSkill(null);
        } else {
            // Filter courses based on the selected skill
            const filtered = yourCourses.filter(course => course.skills.includes(skill));
            setFilteredCourses(filtered);
            setSelectedSkill(skill);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header headerName='Learn' />
            <View style={styles.content}>
                <Topics courses={filteredCourses} handleFilter={handleFilter} selectedSkill={selectedSkill} />
                <Courses title={'Learning Dashboard'} allCourses={filteredCourses} navigation={navigation} skillFiltering={selectedSkill} />
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
