import {View, Text, Platform, StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {usePerson} from "../PersonInformationContext";

export default function MentorBriefDetails({navigateToDetails}) {
    const {lightTheme, textLightBackground, textDarkBackground} = usePerson();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={navigateToDetails}
        >
            <Text style={[
                styles.title,
                {color: lightTheme ? textLightBackground : textDarkBackground}
            ]}>Mentor</Text>
            <View style={styles.contentWrapper}>
                <View style={styles.imageWrapper} >
                    <Ionicons name='person-outline' color='#333' size={40} />
                </View>
                <View style={styles.content}>
                    <View style={styles.textWrapper}>
                        <Text style={[
                            styles.name,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>Aco Gjorgjievski</Text>
                        <Text style={[
                            styles.text,
                            {color: lightTheme ? textLightBackground : textDarkBackground}
                        ]}>
                            Senior Business Expert | Mentor | Advisor | Consultant
                        </Text>
                    </View>
                    <Ionicons name='chevron-forward-outline' color={lightTheme ? '#00b5f0' : 'rgba(0,181,240,0.7)'} size={25} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 40,
        gap: 20,
    },
    contentWrapper: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        aspectRatio: 1,
        backgroundColor: '#aaa',
        borderRadius: 99999,
    },
    title: {
        fontFamily: 'GothicA1-600',
        fontSize: 24,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    textWrapper: {
        maxWidth: '80%',
        gap: 8,
    },
    name: {
        fontFamily: 'GothicA1-600',
        fontSize: 20,
    },
    text: {
        fontFamily: 'GothicA1-400',
        fontSize: 14,
        flexWrap: 'wrap',
    },


})