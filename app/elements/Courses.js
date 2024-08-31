import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import Course from "./Course";
import {usePerson} from "../PersonInformationContext";
import CoursesRecommended from "./CoursesRecommended";

export default function Courses({title, allCourses, navigation, skillFiltering, isRecommendation, recommendedCourses}) {
    const { lightTheme, textLightBackground, textDarkBackground } = usePerson();

    return (
        <View style={styles.container}>
            {isRecommendation && recommendedCourses.length > 0 && (
                <View style={styles.recommended}>
                    <CoursesRecommended
                        title="Check These Out"
                        allCourses={recommendedCourses}
                        navigation={navigation}
                        isRecommendation={isRecommendation}
                    />
                </View>
            )}

            <Text style={[
                styles.heading,
                {color: lightTheme ? textLightBackground : textDarkBackground},
            ]}>{title}</Text>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >

                {allCourses.length===0 && <Text style={[
                    styles.errorText,
                    {color: lightTheme ? textLightBackground : textDarkBackground},
                    ]}>No courses to show {skillFiltering && `with this skill: ${skillFiltering}`}</Text>}

                <View style={styles.coursesWrapper}>
                    {allCourses.map((course, index) => {
                        return <Course
                            key={index}
                            navigation={navigation}
                            course={course}
                            isRecommendation={false}
                        />
                    })}
                </View>

            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        gap: 20,
        ...Platform.select({
            android: {
                gap: 10,
            }
        })
    },
    scrollViewContent: {
        flexGrow: 1,    //for the scroll view to grow
    },
    coursesWrapper: {
        flexGrow: 1,    //for the courses to grow to push the recommended courses
    },
    heading: {
        fontFamily: 'GothicA1-700',
        fontSize: 24,
        ...Platform.select({
            android: {
                fontSize: 22,
            }
        })
    },
    errorText: {
        fontFamily: 'GothicA1-500',
        fontSize: 22,
        alignSelf: 'center',
    },
    recommended: {
        flexGrow: 0,
    },
})
