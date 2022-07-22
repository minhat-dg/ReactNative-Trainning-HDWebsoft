import { noteItemListStyle } from "assets/style";
import { Note } from "models/note";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { pinNote } from "../notesApi";

const NoteItemList = ({ item }: { item: Note }, handleOnPress: (item: Note) => void, handleOnLongPress: (item: Note) => void) => {
    const handlePinNote = () => {
        pinNote(item.id, item.pin)
    }

    const date = item.timestamp.toDate()

    return (
        <TouchableOpacity style={noteItemListStyle.container} onPress={() => handleOnPress(item)} onLongPress={() => handleOnLongPress(item)}>
            <View style={noteItemListStyle.mainContainer}>
                <Text style={noteItemListStyle.title} numberOfLines={1}>{item.title}</Text>

                <Text style={noteItemListStyle.timestamp} numberOfLines={1}>{date.toLocaleTimeString()} - {date.toDateString()}</Text>
            </View>
            {item.lock ?
                <FontAwesome name="lock" color={'#DFF6FF'} size={24} style={noteItemListStyle.icon} />
                : <View style={noteItemListStyle.icon}></View>
            }
            <TouchableOpacity style={noteItemListStyle.iconTouch} onPress={handlePinNote}>
                <FontAwesome name="paperclip" color={'#DFF6FF'} size={24} style={noteItemListStyle.icon} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default NoteItemList;