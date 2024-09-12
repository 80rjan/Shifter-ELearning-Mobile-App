import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { usePerson } from "../PersonInformationContext";

export default function PersonSkills({ person }) {
    const { lightTheme, textLightBackground, textDarkBackground } = usePerson();

    let skillColor = lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)';

    return (
        <View style={styles.container}>
            <Text style={[
                styles.header,
                { color: lightTheme ? textLightBackground : textDarkBackground }
            ]}>Skills Gained</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                <View style={styles.skillsContainer}>
                    {person.skills.length === 0 && <Text style={{
                        fontFamily: 'GothicA1-400', fontSize: 20,
                        color: lightTheme ? textLightBackground : textDarkBackground
                    }}>No skills acquired</Text>}
                    {person.skills.map((skill, index) => (
                        <View style={[
                            styles.skillWrapper,
                            { backgroundColor: skillColor },
                        ]} key={index}>
                            <Text style={styles.skill}>{skill}</Text>
                        </View>
                    ))}
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
    scrollViewContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '120%',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5, // Space between items
    },
    skillWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 10, // Space between items in the same row
        marginBottom: 10, // Space between rows
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
