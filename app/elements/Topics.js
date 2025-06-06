import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform} from 'react-native';
import {usePerson} from "../PersonInformationContext";
import {colorsLight, colorsDark} from "../../assets/Colors";

export default function Topics({ courses, handleFilter, selectedSkill }) {
    const { lightTheme, textLightBackground, textDarkBackground } = usePerson();
    const allSkills = courses.reduce((allSkills, course) => {
        return allSkills.concat(course.skills);
    }, []);

    const topics = [...new Set(allSkills)];
    const colors = lightTheme ? colorsLight : colorsDark;

    return (
        <View style={styles.topicsWrapper}>
            <Text style={[
                styles.heading,
                {color: lightTheme ? textLightBackground : textDarkBackground }
            ]}>Explore Your Interests</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {topics.map((topic, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.scrollElement,
                            {   backgroundColor: colors[index % colors.length],
                                ...Platform.select({
                                    android: {
                                        opacity: 1.0,
                                    }
                                })
                            },
                            selectedSkill === topic ? styles.selected : null
                        ]}
                        onPress={() => handleFilter(topic)}
                    >
                        <Text style={styles.topics}>{topic}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    topicsWrapper: {
        paddingHorizontal: 20,
        flexDirection: 'column',
        gap: 20,

        ...Platform.select({
            android: {
                gap: 10,
            }
        })
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
    scrollView: {
        flexDirection: 'row',
    },
    scrollElement: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,

        ...Platform.select({
            android: {
                paddingVertical: 8,
                paddingHorizontal: 12,
            }
        })

    },
    selected: {
        backgroundColor: '#777', // Darker color for selected topic
        opacity: 0.3,
        transform: [{ scale: 0.9 }],
    },
    topics: {
        fontFamily: 'Roboto-500',
        color: 'white',
        fontSize: 14,

        ...Platform.select({
            android: {
                fontSize: 12,
            }
        })
    }
});
