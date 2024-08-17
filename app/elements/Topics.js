import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform} from 'react-native';

export default function Topics({ handleFilter, selectedSkill }) {

    const topics = ['Sales', 'Marketing', 'Management', 'Onboarding', 'Leadership', 'Strategy'];
    const colors = ['#00b5f0', '#006ef0', '#00f0d3'];

    return (
        <View style={styles.topicsWrapper}>
            <Text style={[styles.heading, {color: '#202020'}]}>Filter By Skill</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {topics.map((topic, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.scrollElement,
                            {   backgroundColor: colors[index % colors.length],
                                opacity: 0.8,

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
        fontSize: 28,

        ...Platform.select({
            android: {
                fontSize: 24,
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
        backgroundColor: '#005f80', // Darker color for selected topic
        opacity: 0.3,
        transform: [{ scale: 0.9 }],
    },
    topics: {
        fontFamily: 'Roboto-500',
        color: 'white',
        fontSize: 16,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    }
});
