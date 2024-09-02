import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShifterLogo from "../../assets/ShifterLogo";
import { usePerson } from "../PersonInformationContext";

export default function Header({ headerName }) {
    const { lightTheme, setLightTheme, lightBackground, darkBackground } = usePerson();

    const toggleTheme = () => {
        setLightTheme(!lightTheme);
    }

    return (
        <View style={[
            styles.headerWrapper,
            {backgroundColor: lightTheme ?  lightBackground : darkBackground},
            Platform.OS === 'android' && {borderBottomColor: lightTheme ? '#ddd' : '#333', borderBottomWidth: 1},
        ]}>
            {Platform.OS === 'ios' ?
                <ShifterLogo width='150' height='50' color={!lightTheme ?  lightBackground : darkBackground} /> :
                <ShifterLogo width='140' height='45' color={!lightTheme ?  lightBackground : darkBackground} />}
            <TouchableOpacity
                onPress={toggleTheme}
                style={{
                    padding: 10,
                    paddingRight: 0,
            }}>
                <Ionicons
                    name={!lightTheme ? 'sunny' : 'moon'}
                    size={25}
                    color={lightTheme ? 'black' : 'white'}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {

        paddingBottom: 5,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: 0.2,

        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,

        ...Platform.select({
            android: {
                elevation: 3,
                paddingTop: 30,
                marginBottom: 10,
            }
        })
    },
});
