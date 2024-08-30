import {ActivityIndicator, Text, View, StyleSheet} from "react-native";
import React from "react";
import ShifterLogo from "../../assets/ShifterLogo";

export default function LoadingScreen({isLightTheme}) {

    return (
        <View style={[
            styles.container,
            {backgroundColor: isLightTheme ? '#eee' : '#222'}
        ]} >
            <ShifterLogo width='300' height='100' color={!isLightTheme ? '#eee' : '#222'} />
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