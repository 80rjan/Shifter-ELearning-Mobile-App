
import {View, Text, StyleSheet} from "react-native";

export default function Header({headerName}) {

    return (
        <View style={styles.headerWrapper}>
            <Text style={styles.heading}>{headerName}</Text>
            <Text style={styles.logo}>Shifter Logo</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    headerWrapper: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    heading: {
        fontFamily: 'GothicA1-800',
        fontSize: 33,
        color: '#202020',
        paddingRight: 0,
    },
    logo: {
        fontFamily: 'GothicA1-900',
        fontSize: 30,
        color: '#00b5f0',
    }
})