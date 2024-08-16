import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

export default function Topics({ handleFilter, selectedSkill }) {

    const topics = ['Sales', 'Marketing', 'Management', 'Onboarding', 'Leadership', 'Strategy'];

    return (
        <View style={styles.topicsWrapper}>
            <Text style={[styles.heading, {color: '#202020'}]}>Learning Paths</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {topics.map((topic, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.scrollElement,
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
    },
    heading: {
        fontFamily: 'GothicA1-700',
        fontSize: 28,
    },
    scrollView: {
        flexDirection: 'row',
    },
    scrollElement: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#00b5f0',
        marginRight: 10,
    },
    selected: {
        backgroundColor: '#005f80', // Darker color for selected topic
    },
    topics: {
        fontFamily: 'Roboto-500',
        color: 'white',
        fontSize: 16,
    }
});
