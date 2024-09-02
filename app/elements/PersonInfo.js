import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { usePerson } from '../PersonInformationContext';
import {auth} from "../../firebaseConfig";

export default function PersonInfo({ person, isChangingInfo, setIsChangingInfo }) {
    const isAnonymous = auth.currentUser?.isAnonymous;
    const { updateProfilePicture, lightTheme, textLightBackground, textDarkBackground } = usePerson();
    const [imageUri, setImageUri] = useState(person.profilePicture || null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'We need permission to access your photos.');
            }
        })();
    }, []);

    const handleChooseImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;
                setImageUri(uri);
                updateProfilePicture(uri); // Update profile picture in context and Firestore
            } else {
                Alert.alert('Cancelled', 'You did not select any image.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                <Text style={[
                    styles.title,
                    { color: lightTheme ? textLightBackground : textDarkBackground }
                ]}>{person.name}</Text>
                {!isAnonymous && <Text style={[
                    styles.text,
                    { color: lightTheme ? textLightBackground : textDarkBackground }
                ]}>{person.jobTitle}, {person.company}</Text>}
                <Text style={[
                    styles.text,
                    { color: lightTheme ? textLightBackground : textDarkBackground }
                ]}>{person.email}</Text>

                {!isChangingInfo && !isAnonymous ?<TouchableOpacity onPress={() => setIsChangingInfo(true)}>
                    <Text style={[
                        styles.text,
                        { color: '#00b5f0' }
                    ]} >
                        Change Information?
                    </Text>
                </TouchableOpacity> : null }
            </View>
            <TouchableOpacity style={[
                styles.imageWrapper,
                { backgroundColor: lightTheme ? '#ddd' : '#333' }
            ]} onPress={handleChooseImage}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <Ionicons name={'person-outline'} color={lightTheme ? '#999' : '#aaa'} size={50} />
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        maxWidth: '100%',
        gap: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        ...Platform.select({
            android: {
                marginTop: 10,
            }
        })

    },
    textWrapper: {
        gap: 8,
        maxWidth: '70%',
        flexShrink: 1,

        ...Platform.select({
            android: {
                gap: 0,
            }
        })
    },
    title: {
        flexWrap: 'wrap',
        fontFamily: 'GothicA1-700',
        fontSize: 20,

        ...Platform.select({
            android: {
                fontSize: 18,
            }
        })
    },
    text: {
        flexWrap: 'wrap',
        fontFamily: 'GothicA1-400',
        fontSize: 16,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    },
    imageWrapper: {
        width: '30%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9999,
        overflow: 'hidden',

        ...Platform.select({
            android: {
                height: 90,
                width: 90,
            }
        }),

    },
    image: {
        width: '100%',
        height: '100%',
    }
});
