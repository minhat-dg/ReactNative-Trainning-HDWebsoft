import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { noteOptionStyle } from "assets/style";

const NoteOption = ({ modalVisible, setModalVisible, handleDeleteNote, handleMoveNote, item }) => {
    return (
        <View style={noteOptionStyle.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={noteOptionStyle.centeredView}>
                    <View style={noteOptionStyle.modalView}>
                        <TouchableOpacity style={noteOptionStyle.container} onPress={handleMoveNote}>
                            <Text style={noteOptionStyle.textModal}>Move to another group</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={noteOptionStyle.container} onPress={() => handleDeleteNote(item)}>
                            <Text style={noteOptionStyle.textModal}>Delete note</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={noteOptionStyle.container} onPress={() => setModalVisible(false)}>
                            <Text style={noteOptionStyle.textModal}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

export default NoteOption;