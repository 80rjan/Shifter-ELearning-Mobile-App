
import {View, Image, Text, StyleSheet, SafeAreaView} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function Navbar () {
    const iconDimensions = 35;

    return (
        <View style={styles.navbarWrapper} >
            <View style={styles.navbarLink}>
                <Image source={require('../../assets/HomeIcon.png')} style={styles.logo} />
                <Text style={styles.navbarText}>Courses</Text>
            </View>
            <View style={styles.navbarLink}>
                <Image source={require('../../assets/WishlistIcon.png')} style={styles.logo} />
                <Text style={styles.navbarText}>Wishlist</Text>
            </View>
            <View style={styles.navbarLink}>
                <Image source={require('../../assets/LearnIcon.png')} style={styles.logo} />
                <Text style={styles.navbarText}>Learn</Text>
            </View>
            <View style={styles.navbarLink}>
                <Image source={require('../../assets/ProfileIcon.png')} style={styles.logo} />
                <Text style={styles.navbarText}>Profile</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        paddingTop: 10,
        // borderTopColor: 'rgba(0,0,0,0.3)',
        // borderTopWidth: 0.3,

        backgroundColor: '#f8f8f8',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3, // For Android
    },
    navbarLink: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
    },
    navbarText: {
        color: '#888',
        fontWeight: "500",
        fontSize: '16',
    },
})