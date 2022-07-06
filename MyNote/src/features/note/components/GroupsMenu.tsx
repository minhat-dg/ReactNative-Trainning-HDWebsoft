import React from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GroupMenu = ({ modalVisible, setModalVisible, groups, moveNote }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        {groups.map((item) =>
                            <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => moveNote(item.id)}>
                                <Text style={styles.textModal}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.itemContainer} onPress={() => setModalVisible(false)}>
                            <Text style={styles.textModal}>Cancel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    container: {
        alignItems: "center",
        backgroundColor: "#06283D",
        borderColor: '#000000',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        maxHeight: '50%'
    },
    textModal: {
        textAlign: "center",
        color: 'white',
        fontSize: 15,
    },
    scrollView: {
        width: '100%'
    },
    itemContainer: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 10
    }
});

export default GroupMenu;
