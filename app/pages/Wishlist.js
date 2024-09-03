import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Courses from "../elements/Courses";
import CoursesRecommended from "../elements/CoursesRecommended";
import { usePerson } from "../PersonInformationContext";
import Header from "../elements/Header";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function Wishlist({ navigation }) {
    const { user, lightTheme, lightBackground, darkBackground } = usePerson();
    const insets = useSafeAreaInsets();
    const favoriteCourses = user.coursesFavorite || [];

    return (
        <View style={[
            styles.container,
            { backgroundColor: lightTheme ? lightBackground : darkBackground },
            {
                paddingTop: insets.top,
            }
        ]}>
            <Header headerName="Wishlist" />
            <View style={styles.content}>
                <Courses
                    title="Your Favorites"
                    courses={favoriteCourses}
                    navigation={navigation}
                    isRecommendation={true}
                />
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
    },
});
