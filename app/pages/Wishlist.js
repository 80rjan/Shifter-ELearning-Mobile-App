
import {View, Text, StyleSheet, SafeAreaView} from "react-native";
import Courses from "../elements/Courses";
import {usePerson} from "../PersonInformationContext";
import Header from "../elements/Header";
import allCoursesDetails from "../AllCoursesDetails";

export default function Wishlist({navigation}) {
    const {person} = usePerson();
    const favoriteCourses = person.coursesFavorite;
    const coursesBought = person.coursesBought;

    const filteredFavoriteCourses = favoriteCourses.filter(favoriteCourse =>
        !coursesBought.some(boughtCourse => boughtCourse.title === favoriteCourse.title)
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header headerName='Wishlist' />
            <View style={styles.content} >
                <Courses title={'Your Favorites'} allCourses={filteredFavoriteCourses} navigation={navigation}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text : {
        fontSize: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    content: {
        flex: 1,
    }
})