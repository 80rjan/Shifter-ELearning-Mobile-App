
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import styleToBarStyle from "expo-status-bar/build/styleToBarStyle";

export default function Topics() {

    return (
        <View style={styles.topicsWrapper}>
            <Text style={[styles.heading, {color: '#202020'}]}>Learning Paths</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.scrollElement}><Text style={styles.topics}>Sales</Text></View>
                <View style={styles.scrollElement}><Text style={styles.topics}>Marketing</Text></View>
                <View style={styles.scrollElement}><Text style={styles.topics}>Business Transformation</Text></View>
                <View style={styles.scrollElement}><Text style={styles.topics}>Onboarding</Text></View>
                <View style={styles.scrollElement}><Text style={styles.topics}>Leadership</Text></View>
                <View style={styles.scrollElement}><Text style={styles.topics}>Strategy</Text></View>
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
    topics: {
        fontFamily: 'Roboto-500',
        color: 'white',
        fontSize: 16,
    }
})