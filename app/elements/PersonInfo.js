

import {View, Text, StyleSheet, SafeAreaView} from "react-native";

export default function PersonInfo({ person }) {

    return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                <Text style={[styles.title, {color: '#202020'}]}>{person.name}</Text>
                <Text style={[styles.text, {color: '#202020'}]}>{person.job}</Text>
                <Text style={[styles.text, {color: '#202020'}]}>{person.email}</Text>
            </View>
            <View style={styles.imageWrapper}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textWrapper: {
        gap: 8,
    },
    title: {
        fontFamily: 'GothicA1-700',
        fontSize: 20,
    },
    text: {
        fontFamily: 'GothicA1-400',
        fontSize: 16,
    },
    imageWrapper: {
        // height: '100%',
        // width: 100,
        // height: 100,
        width: '25%',
        aspectRatio: 1,
        borderRadius: 999,
        backgroundColor: '#ccc',
        overflow: 'hidden',
    }
})