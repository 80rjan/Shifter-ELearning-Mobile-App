// Header.js
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import ShifterLogo from "../../assets/ShifterLogo";

export default function Header({ headerName }) {
    return (
        <View style={styles.headerWrapper}>
            <Text style={styles.heading}>{headerName}</Text>
            <ShifterLogo />
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40,
        ...Platform.select({
            android: {
                paddingTop: 30,
                marginBottom: 10,
            }
        })
    },
    heading: {
        fontFamily: 'GothicA1-800',
        fontSize: 28,
        color: '#202020',
        paddingRight: 0,
        ...Platform.select({
            android: {
                fontSize: 26,
            }
        })
    },
});
