import {View, Text, StyleSheet, ScrollView, Platform} from "react-native";
import { usePerson } from "../PersonInformationContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import {resume, ending} from "../../assets/MentorShortResume";
import {colorsLight, colorsDark} from "../../assets/Colors";

export default function MentorDetails() {
    const { lightTheme, lightBackground, darkBackground, textLightBackground, textDarkBackground } = usePerson();
    const [viewHeight, setViewHeight] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);

    // Get header height
    const onLayoutHeader = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeaderHeight(height);
    };

    // Get image wrapper height
    const onLayoutImageWrapper = (event) => {
        const { height } = event.nativeEvent.layout;
        setViewHeight(height);
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: lightTheme ? lightBackground : darkBackground }
            ]}
        >
            <View
                style={[
                    styles.header,
                    { backgroundColor: lightTheme ? colorsLight[2] : colorsDark[2] }
                ]}
                onLayout={onLayoutHeader}
            ></View>
            <View
                style={[
                    styles.imageWrapper,
                    { top: headerHeight - viewHeight / 2 },
                    {
                        borderWidth: 8,
                        borderColor: lightTheme ? lightBackground : darkBackground
                    }
                ]}
                onLayout={onLayoutImageWrapper}
            >
                <Ionicons name="person-outline" color="#333" size={50} />
            </View>
            <ScrollView
                style={[
                    styles.content,
                    { marginTop: viewHeight / 2 + (Platform.OS==='ios' ? 20 : 10)},
                ]}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleWrapper}>
                    <View style={styles.lineContainer}>
                        <View style={[
                            styles.line,
                            { backgroundColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)' }
                        ]} />
                        <Text style={[
                            styles.title,
                            { color: lightTheme ? textLightBackground : textDarkBackground }
                        ]}>
                            Aco Gjorgjievski
                        </Text>
                        <View style={[
                            styles.line,
                            { backgroundColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)' }
                        ]} />
                    </View>
                    <Text style={[
                        styles.details,
                        { color: lightTheme ? textLightBackground : textDarkBackground }
                    ]} >
                        Senior Business Expert | Mentor | Advisor | Consultant
                    </Text>
                </View>
                <Text style={[
                    styles.text,
                    { color: lightTheme ? textLightBackground : textDarkBackground }
                ]} >
                    {resume}
                </Text>
                <View style={[
                    styles.line,
                    { backgroundColor: lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)' },
                    { width: '30%', alignSelf: 'center', marginVertical: 10 }
                ]} />
                <Text style={[
                    styles.text,
                    { color: lightTheme ? textLightBackground : textDarkBackground }
                ]} >
                    {ending}
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: "20%",
        width: "100%"
    },
    imageWrapper: {
        position: "absolute",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        aspectRatio: 1,
        backgroundColor: "#aaa",
        borderRadius: 99999
    },
    content: {
        paddingHorizontal: 10,
    },
    scrollViewContent: {
        paddingBottom: 40,
        paddingTop: 10,
    },
    titleWrapper: {
        alignItems: 'center',
        gap: 16,

        ...Platform.select({
            android: {
                gap: 8,
            }
        })
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 1,
    },
    title: {
        fontFamily: 'GothicA1-800',
        fontSize: 24,
        textAlign: 'center',
        paddingHorizontal: 10,

        ...Platform.select({
            android: {
                fontSize: 22,
            }
        })
    },
    details: {
        paddingHorizontal: 20,
        textAlign: 'center',
        fontFamily: 'GothicA1-500',
        fontSize: 16,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    },
    text: {
        marginTop: 20,
        paddingHorizontal: 10,
        fontFamily: 'GothicA1-400',
        fontSize: 16,
        lineHeight: 24,

        ...Platform.select({
            android: {
                fontSize: 14,
                lineHeight: 22,
            }
        })
    }
});
