import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { noteItemStyle } from "../../../assets/style";

const NoteItem = ({ item }, handleOnPress, handleOnLongPress) => {

    return (
        <TouchableOpacity style={noteItemStyle.itemContainer} onPress={() => handleOnPress(item)} onLongPress={() => handleOnLongPress(item)}>
            <View style={noteItemStyle.itemCard}>
                <Text style={noteItemStyle.itemTextDescription}>{item.content}</Text>
            </View>
            <Text style={noteItemStyle.itemTextName}>{item.title}</Text>
        </TouchableOpacity>
    )
}

export default NoteItem;