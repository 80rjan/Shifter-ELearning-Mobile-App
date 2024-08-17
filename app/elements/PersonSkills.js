import React from 'react';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';

export default function PersonSkills({ person }) {
    // Split skills into two rows
    const firstRowSkills = person.skills.slice(0, Math.ceil(person.skills.length / 2));
    const secondRowSkills = person.skills.slice(Math.ceil(person.skills.length / 2));

    return (
        <View style={styles.container}>
            <Text style={[styles.header, { color: '#202020' }]}>Skills Gained</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.content}>
                    {/* First Row */}
                    <View style={styles.row}>
                        {firstRowSkills.map((skill, index) => (
                            <View style={styles.skillWrapper} key={index}>
                                <Text style={styles.skill}>{skill}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Second Row */}
                    <View style={[styles.row, styles.secondRow]}>
                        {secondRowSkills.map((skill, index) => (
                            <View style={styles.skillWrapper} key={index}>
                                <Text style={styles.skill}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        gap: 20,

        ...Platform.select({
            android: {
                gap: 10,
            }
        })
    },
    header: {
        fontFamily: 'GothicA1-700',
        fontSize: 28,

        ...Platform.select({
            android: {
                fontSize: 25,
            }
        })
    },
    content: {
        flexDirection: 'column',
        gap: 5,
    },
    scrollView: {
    },
    row: {
        flexDirection: 'row',
    },
    secondRow: {
        paddingLeft: 50,
    },
    skillWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        backgroundColor: '#00b5f0',
        marginRight: 30, // Space between items in the same

        ...Platform.select({
            android: {
                paddingVertical: 5,
                paddingHorizontal: 10,
            }
        })
    },
    skill: {
        color: 'white',
        fontFamily: 'GothicA1-400',
        fontSize: 16,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    },
});
