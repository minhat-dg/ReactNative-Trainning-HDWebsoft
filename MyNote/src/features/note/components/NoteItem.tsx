import { noteItemStyle } from "assets/style";
import { Note } from "models/note";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const NoteItem = ({ item }: { item: Note }, handleOnPress: (item: Note) => void, handleOnLongPress: (item: Note) => void) => {
    return (
        <TouchableOpacity style={noteItemStyle.itemContainer} onPress={() => handleOnPress(item)} onLongPress={() => handleOnLongPress(item)}>
            <View style={noteItemStyle.itemCard}>
                <Text style={noteItemStyle.itemTextDescription}>{item.content}</Text>
                {item.lock ?
                    <View style={noteItemStyle.icon}>
                        <FontAwesome name="lock" color={'#06283D'} size={25} />
                    </View>
                    : <View />
                }
            </View>
            <Text style={noteItemStyle.itemTextName}>{item.title}</Text>
        </TouchableOpacity>
    )
}

export default NoteItem;