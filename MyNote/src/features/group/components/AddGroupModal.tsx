import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { groupAction } from "../groupSlice";

const AddGroupModal = ({ modalVisible, setModalVisible }) => {
    const [groupName, setGroupName] = useState('')
    const [groupDesc, setGroupDesc] = useState('')

    const dispatch = useAppDispatch()
    const uid = useAppSelector(state => state.auth.currentUser?.uid)

    const handleAdd = () => {
        setModalVisible(!modalVisible)
        dispatch(groupAction.addGroup({
            name: groupName,
            description: groupDesc,
            count: 0,
            uid: uid
        }))
        setGroupName('')
        setGroupDesc('')
    }

    const handleCancel = () => {
        setModalVisible(!modalVisible)
    }

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
                        <Text style={styles.textModal}>Add group</Text>
                        <CustomInput value={groupName} setValue={setGroupName} placeHolder="Group name" secureText={false} />
                        <CustomInput value={groupDesc} setValue={setGroupDesc} placeHolder="Group description" secureText={false} />
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Pressable
                                style={styles.buttonCancel}
                                onPress={handleCancel}
                            >
                                <Text style={styles.textButton}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={styles.buttonAdd}
                                onPress={handleAdd}
                            >
                                <Text style={styles.textButton}>Add</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "#06283D",
        borderRadius: 20,
        borderColor: '#000000',
        borderWidth: 1,
        padding: 20,
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
    textButton: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    },
    textModal: {
        marginBottom: 10,
        textAlign: "center",
        color: 'white',
        fontSize: 20
    },
    buttonAdd: {
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        backgroundColor: '#47B5FF',
        width: '30%',
        marginHorizontal: 5,
    },
    buttonCancel: {
        borderRadius: 10,
        borderColor: '#47B5FF',
        borderWidth: 1,
        backgroundColor: '#06283D',
        padding: 5,
        elevation: 2,
        width: '30%',
        marginHorizontal: 5,
    }
});

export default AddGroupModal;