
import {Platform, View, Text, StyleSheet} from "react-native";

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
    logo: {
        fontFamily: 'GothicA1-900',
        fontSize: 26,
        color: '#00b5f0',
        ...Platform.select({
            android: {
                fontSize: 24,
            }
        })

    }
})