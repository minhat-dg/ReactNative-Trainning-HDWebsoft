import { groupMenuStyle } from "assets/style";
import { Group } from "models/group";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

const GroupMenu = ({ modalVisible, setModalVisible, groups, moveNote }: { modalVisible: boolean, setModalVisible: React.Dispatch<React.SetStateAction<boolean>>, groups: Group[], moveNote: (newGroupId: string) => void }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={groupMenuStyle.centeredView}>
                <View style={groupMenuStyle.container}>
                    <ScrollView style={groupMenuStyle.scrollView}>
                        {groups.map((item: Group) =>
                            <TouchableOpacity key={item.id} style={groupMenuStyle.itemContainer} onPress={() => moveNote(item.id)}>
                                <Text style={groupMenuStyle.textModal}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={groupMenuStyle.itemContainer} onPress={() => setModalVisible(false)}>
                            <Text style={groupMenuStyle.textModal}>Cancel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal >
    )
}

export default GroupMenu;
