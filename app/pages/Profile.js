
import {View, Text, StyleSheet, SafeAreaView, Platform} from "react-native";
import Header from "../elements/Header";
import {usePerson} from "../PersonInformationContext";
import PersonInfo from "../elements/PersonInfo";
import PersonRewards from "../elements/PersonRewards";
import PersonSkills from "../elements/PersonSkills";

export default function Profile() {
    const {person} = usePerson();

    return (
        <SafeAreaView style={styles.container}>
            <Header headerName='Profile' />
            <View style={styles.content}>
                <PersonInfo person={person}/>
                <PersonRewards person={person}/>
                <PersonSkills person={person}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    content: {
        gap: 30,

        ...Platform.select({
            android: {
                gap: 20,
            }
        })

    }
})