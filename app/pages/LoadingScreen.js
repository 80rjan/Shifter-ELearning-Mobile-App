import {ActivityIndicator, Text, View, StyleSheet} from "react-native";
import React from "react";
import ShifterLogo from "../../assets/ShifterLogo";
import Svg, {G, Polyline} from "react-native-svg";

export default function LoadingScreen() {

    return (
        <View style={styles.container} >
            <ShifterLogo width='300' height='100' />
            <ActivityIndicator size="large" color="#00b5f0" />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
})