import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoteOption = ({ modalVisible, setModalVisible, handleDeleteNote, handleMoveNote, item }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.container} onPress={handleMoveNote}>
                            <Text style={styles.textModal}>Move to another group</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container} onPress={() => handleDeleteNote(item)}>
                            <Text style={styles.textModal}>Delete note</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container} onPress={() => setModalVisible(false)}>
                            <Text style={styles.textModal}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#06283D",
        borderColor: '#000000',
        borderWidth: 1,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    container: {
        width: '100%',
        borderBottomWidth: 1,
        padding: 10
    },
    textModal: {
        textAlign: "center",
        color: 'white',
        fontSize: 15,
    },
});

export default NoteOption;