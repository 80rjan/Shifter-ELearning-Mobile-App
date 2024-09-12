import {usePerson} from "../PersonInformationContext";
import {View, Text, StyleSheet, TouchableOpacity, Platform} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import ShifterLogo from "../../assets/ShifterLogo";
import React, {useState} from "react";
import {colorsLight, colorsDark} from "../../assets/Colors";
import {auth, db} from "../../firebaseConfig";
import {doc, setDoc} from "firebase/firestore";

export default function UserPreferences({ handleSubmit }) {
    const { allCourses, user, changeUserDetails, lightTheme, lightBackground, textLightBackground, darkBackground, textDarkBackground } = usePerson();
    const insets = useSafeAreaInsets();

    const allSkills = allCourses.reduce((allSkills, course) => {
        return allSkills.concat(course.skills);
    }, []);

    const skills = [...new Set(allSkills)];

    const [preferredSkills, setPreferredSkills] = useState([]);

    const toggleSkill = (skill) => {
        setPreferredSkills(prevPreferredSkills => {
            if (prevPreferredSkills.includes(skill)) {
                // Deselect skill
                return prevPreferredSkills.filter(s => s !== skill);
            } else {
                // Select skill
                return [...prevPreferredSkills, skill];
            }
        });
    };

    const isSelected = (skill) => preferredSkills.includes(skill);


    const handlePress = async () => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            try {
                // await setDoc(doc(db, 'users', userId), {
                //     preferredSkills: selectedSkills
                // }, { merge: true });
                changeUserDetails({ preferredSkills });
                console.log(user);
            } catch (error) {
                console.error('Error saving preferred skills: ', error);
            }
            finally {
                handleSubmit();
            }
        }
    };


    return (
        <View style={[
            styles.safeView,
            { backgroundColor: lightTheme ? lightBackground : darkBackground },
            { paddingTop: insets.top, paddingBottom: insets.bottom }
        ]}>
            <View style={styles.container} >
                <View style={styles.logo}>
                    <ShifterLogo width='250' height='125' color={!lightTheme ?  lightBackground : darkBackground} />
                </View>
                <View style={styles.content} >
                    <Text style={[
                        styles.title,
                        { color: lightTheme ? textLightBackground : textDarkBackground }
                    ]} >
                        What skills would you like to improve?
                    </Text>
                    <View style={styles.skillsWrapper} >
                        {skills.map((skill, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => toggleSkill(skill)}
                                style={[
                                    styles.skill,
                                    { backgroundColor: lightTheme ? '#ddd' : '#444' },
                                    isSelected(skill) ? {backgroundColor: lightTheme ? colorsLight[0] : colorsDark[0] } : {}
                                ]}
                            >
                                <Text style={[
                                    styles.skillText,
                                    { color: lightTheme ? textLightBackground : textDarkBackground },
                                    isSelected(skill) ? { color: 'white' } : {}
                                ]}>{skill}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: lightTheme ? colorsLight[0] : colorsDark[0]}
                        ]}
                        onPress={handlePress}
                    >
                        <Text style={[
                            styles.buttonText,
                        ]} >Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: '10%',
    },
    logo: {
        alignItems: 'center',
    },
    content: {
        flex: 1,
        paddingTop: '20%',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 30,

        ...Platform.select({
            android: {
                paddingTop: '10%',
            }
        })
    },
    title: {
        fontFamily: 'GothicA1-600',
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 32,

        ...Platform.select({
            android: {
                fontSize: 20,
                lineHeight: 28,
            }
        })
    },
    skillsWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    skill: {
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 8,
        marginBottom: 16,
        marginRight: 16,
        transform: [{ scale: 1 }],

        ...Platform.select({
            android: {
                paddingVertical: 6,
                paddingHorizontal: 20,
                marginRight: 12,
            }
        })
    },
    skillText: {
        fontFamily: 'GothicA1-500',
        fontSize: 18,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    },
    button: {
        width: '70%',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 5,

        ...Platform.select({
            android: {
                paddingVertical: 8,
            }
        })
    },
    buttonText: {
        fontFamily: 'GothicA1-700',
        color: '#fff',
        fontSize: 20,

        ...Platform.select({
            android: {
                fontSize: 16,
            }
        })
    },
});
