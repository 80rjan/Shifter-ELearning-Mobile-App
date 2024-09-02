import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import Course from "./Course";
import {usePerson} from "../PersonInformationContext";
import CoursesRecommended from "./CoursesRecommended";

export default function Courses({title, courses, navigation, skillFiltering, isRecommendation}) {
    const { allCourses, user, lightTheme, textLightBackground, textDarkBackground } = usePerson();

    const boughtCourses = user.coursesBought;
    const skillsBought = boughtCourses.slice().reverse().reduce((resultSkills, course) => {
        return resultSkills.concat(course.skills);
    }, []);
    const recommendedCourses = allCourses.
    filter(course =>
                skillsBought.some(skill => course.skills.includes(skill)) &&
                !boughtCourses.some(boughtCourse => boughtCourse.title === course.title)
            // && !user.coursesFavorite.some(favoriteCourse => favoriteCourse.title === course.title);
        )
        .sort((a, b) => {
            // Sort by the index of the first matching skill in the reversed skillsBought array
            const aFirstMatchIndex = skillsBought.findIndex(skill => a.skills.includes(skill));
            const bFirstMatchIndex = skillsBought.findIndex(skill => b.skills.includes(skill));

            // If a course matches skills from more recent purchases, prioritize it
            return aFirstMatchIndex - bFirstMatchIndex;
        });

    return (
        <View style={styles.container}>
            {isRecommendation && recommendedCourses.length > 0 && (
                <View style={styles.recommended}>
                    <CoursesRecommended
                        title="Top Picks For You"
                        navigation={navigation}
                        courses={recommendedCourses}
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

                {courses.length===0 && <Text style={[
                    styles.errorText,
                    {color: lightTheme ? textLightBackground : textDarkBackground},
                    ]}>No courses to show {skillFiltering && `with this skill: ${skillFiltering}`}</Text>}

                <View style={styles.coursesWrapper}>
                    {courses.map((course, index) => {
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
