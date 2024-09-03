
import {StyleSheet, View, Text, Platform, Modal, TouchableOpacity} from "react-native";
import React, {useState} from "react";

export default function ModalAlert({ modalVisible, setModalVisible, handleContinue, handleFunction, functionButtonText}) {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Congratulations!</Text>
                    <Text style={styles.message}>You have successfully purchased the course!</Text>
                    <View style={styles.buttonWrapper} >
                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.buttonContinue,
                            ]}
                            onPress={handleContinue}
                        >
                            <Text style={[
                                styles.buttonText,
                                styles.buttonTextContinue
                            ]}>Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.buttonFunction
                            ]}
                            onPress={() => {
                                handleFunction();
                                handleContinue();
                            }}
                        >
                            <Text style={[
                                styles.buttonFunctionText,
                                styles.buttonText,
                            ]}>{functionButtonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles=StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    container: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',

        ...Platform.select({
            android: {
                padding: 10,
            }
        })
    },
    title: {
        fontFamily: 'GothicA1-700',
        fontSize: 22,
        marginBottom: 10,

        ...Platform.select({
            android: {
                fontSize: 18,
                marginBottom: 0,
            }
        })
    },
    message: {
        fontFamily: 'GothicA1-500',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    },
    buttonWrapper: {
        gap: 8,
        alignItems: 'center',
    },
    button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,

        ...Platform.select({
            android: {
                paddingVertical: 8,
                paddingHorizontal: 16,
            }
        })
    },
    buttonText: {
        alignSelf: 'center',
        color: '#fff',
        fontFamily: 'GothicA1-700',
        fontSize: 16,

        ...Platform.select({
            android: {
                fontSize: 14,
            }
        })
    },
    buttonContinue: {
        backgroundColor: '#aaa',
    },
    buttonTextContinue: {
    },
    buttonFunction: {
        backgroundColor: '#00b5f0',
    },
    buttonFunctionText: {

    }
})