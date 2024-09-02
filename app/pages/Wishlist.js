import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Courses from "../elements/Courses";
import CoursesRecommended from "../elements/CoursesRecommended";
import { usePerson } from "../PersonInformationContext";
import Header from "../elements/Header";
import allCoursesDetails from "../AllCoursesDetails";

export default function Wishlist({ navigation }) {
    const { user, lightTheme, lightBackground, darkBackground } = usePerson();
    const favoriteCourses = user.coursesFavorite || []; // Ensure it's an array
    // const filteredFavoriteCourses = favoriteCourses.filter(favoriteCourse =>
    //     !user.coursesBought.some(boughtCourse => boughtCourse.title === favoriteCourse.title)
    // );
    //
    // const skillsFavorites = favoriteCourses.reduce((resultSkills, course) => {
    //     return resultSkills.concat(course.skills);
    // }, []);
    //
    // // Courses with the same skill as the ones in favorites and that are not favorite
    // const recommendedCourses = allCoursesDetails.filter((course) => {
    //     return skillsFavorites.some(skill => course.skills.includes(skill)) &&
    //         !favoriteCourses.some(favoriteCourse => favoriteCourse.title === course.title) &&
    //         !user.coursesBought.some(boughtCourse => boughtCourse.title === course.title);
    // });

    return (
        <SafeAreaView style={[
            styles.container,
            { backgroundColor: lightTheme ? lightBackground : darkBackground },
        ]}>
            <Header headerName="Wishlist" />
            <View style={styles.content}>
                <Courses
                    title="Your Favorites"
                    allCourses={favoriteCourses}
                    navigation={navigation}
                    isRecommendation={true}
                />
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
    },
});
