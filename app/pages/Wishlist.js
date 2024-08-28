
import {View, Text, StyleSheet, SafeAreaView} from "react-native";
import Courses from "../elements/Courses";
import {usePerson} from "../PersonInformationContext";
import Header from "../elements/Header";
import allCoursesDetails from "../AllCoursesDetails";

export default function Wishlist({navigation}) {
    const { user, lightTheme, lightBackground, darkBackground } = usePerson();
    const favoriteCourses = user.coursesFavorite;
    const filteredFavoriteCourses = favoriteCourses.filter(favoriteCourse =>
        !user.coursesBought.some(boughtCourse => boughtCourse.title === favoriteCourse.title)
    );

    return (
        <SafeAreaView style={[
            styles.container,
            { backgroundColor: lightTheme ? lightBackground : darkBackground },
        ]}>
            <Header headerName='Wishlist' />
            <View style={styles.content} >
                <Courses title={'Favorites'} allCourses={filteredFavoriteCourses} navigation={navigation}/>
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
    },
    content: {
        flex: 1,
    }
})