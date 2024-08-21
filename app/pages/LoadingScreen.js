import {ActivityIndicator, Text, View} from "react-native";
import React from "react";

export default function LoadingScreen() {

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }} >
            <ActivityIndicator size="large" color="#00b5f0" />
            <Text style={{
                fontSize: 18,
                marginTop: 10,
            }} >Loading</Text>
        </View>
    )
}