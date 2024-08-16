
import {View, Text, SafeAreaView, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

export default function PersonRewards({ person }) {
    const iconSize = 25;

    return (
        <View style={styles.container}>
            <Text style={[styles.header, {color: '#202020'}]}>Rewards</Text>
            <View style={styles.content}>
                <View style={styles.reward}>
                    <Ionicons name={'book-outline'} color={'#00b5f0'} size={iconSize} />
                    <Text style={styles.rewardText}>Courses Acquired: {person.coursesLength}</Text>
                </View>
                <View style={styles.reward}>
                    <Ionicons name={'layers-outline'} color={'#00b5f0'} size={iconSize} />
                    <Text style={styles.rewardText}>Skills Gained: {person.skillsLength}</Text>
                </View>
                <View style={styles.reward}>
                    <Ionicons name={'podium-outline'} color={'#00b5f0'} size={iconSize} />
                    <Text style={styles.rewardText}>Points: {person.points}</Text>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        gap: 20,
    },
    header: {
        fontFamily: 'GothicA1-700',
        fontSize: 28,
    },
    content: {
        gap: 10,
    },
    reward: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    rewardText: {
        fontFamily: 'GothicA1-400',
        fontSize: 18,
    }
})