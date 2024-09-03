import React from 'react';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import {usePerson} from "../PersonInformationContext";

export default function PersonSkills({ person }) {
    const { lightTheme, textLightBackground, textDarkBackground } = usePerson();

    // Split skills into two rows
    const firstRowSkills = person.skills.slice(0, Math.ceil(person.skills.length / 2));
    const secondRowSkills = person.skills.slice(Math.ceil(person.skills.length / 2));
    let skillColor = lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)';

    return (
        <View style={styles.container}>
            <Text style={[
                styles.header,
                {color: lightTheme ? textLightBackground : textDarkBackground}
            ]}>Skills Gained</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.content}>
                    {person.skills.length===0 && <Text style={{fontFamily: 'GothicA1-400', fontSize: 20,
                    color: lightTheme ? textLightBackground : textDarkBackground
                    }} >No skills acquired</Text> }
                    {/* First Row */}
                    <View style={styles.row}>
                        {firstRowSkills.map((skill, index) => (
                            <View style={[
                                styles.skillWrapper,
                                {backgroundColor: skillColor},
                            ]} key={index}>
                                <Text style={styles.skill}>{skill}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Second Row */}
                    <View style={[styles.row, styles.secondRow]}>
                        {secondRowSkills.map((skill, index) => (
                            <View style={[
                                styles.skillWrapper,
                                {backgroundColor: skillColor},
                            ]} key={index}>
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
        fontSize: 23,

        ...Platform.select({
            android: {
                fontSize: 22,
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
        paddingLeft: 100,
    },
    skillWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
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
        fontFamily: 'GothicA1-500',
        fontSize: 16,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    },
});
