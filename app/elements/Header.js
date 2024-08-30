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
        ]}>
            {Platform.OS === 'ios' ?
                <ShifterLogo width='150' height='50' color={!lightTheme ?  lightBackground : darkBackground} /> :
                <ShifterLogo width='130' height='40' color={!lightTheme ?  lightBackground : darkBackground} />}
            <TouchableOpacity onPress={toggleTheme}>
                <Ionicons
                    name={!lightTheme ? 'sunny' : 'moon'}
                    size={25}
                    color={lightTheme ? 'black' : 'white'}
                />
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={toggleTheme}>*/}
            {/*    <View style={[*/}
            {/*        styles.switchTrack,*/}
            {/*        { backgroundColor: lightTheme ? '#bbb' : 'rgba(0,181,240,0.7)' },*/}
            {/*        {flexDirection: lightTheme ? 'row' : 'row-reverse'}*/}
            {/*    ]}>*/}
            {/*        <View style={[*/}
            {/*            styles.switchThumb,*/}
            {/*            { alignItems: lightTheme ? 'flex-start' : 'flex-end' }*/}
            {/*        ]}>*/}
            {/*            <Ionicons*/}
            {/*                name={lightTheme ? 'sunny' : 'moon'}*/}
            {/*                size={25}*/}
            {/*                color={lightTheme ? 'black' : 'black'}*/}
            {/*            />*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</TouchableOpacity>*/}
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
                paddingTop: 30,
                marginBottom: 10,
            }
        })
    },
    switchTrack: {
        width: 60,
        height: 20,
        borderRadius: 15,
        alignItems: 'center',
        paddingHorizontal: 5,
        position: 'relative',
    },
    switchThumb: {
        borderRadius: 100,
        padding: 2,
        backgroundColor: '#fff',
        position: 'absolute',
        // top: 2.5,
    },
});
