import { noteItemHorizontalStyle } from "assets/style";
import { Note } from "models/note";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { pinNote } from "../notesApi";

const NoteItem = ({ item }: { item: Note }, handleOnPress: (item: Note) => void, handleOnLongPress: (item: Note) => void) => {
    const handlePinNote = () => {
        pinNote(item.id, item.pin)
    }

    return (
        <TouchableOpacity style={noteItemHorizontalStyle.itemContainer} onPress={() => handleOnPress(item)} onLongPress={() => handleOnLongPress(item)}>
            <View style={noteItemHorizontalStyle.itemCard}>

                {item.lock ?
                    <FontAwesome name="lock" color={'#06283D'} size={50} style={noteItemHorizontalStyle.iconLarge} />
                    : <Text style={noteItemHorizontalStyle.itemTextDescription}>{item.content}</Text>
                }
                <View style={noteItemHorizontalStyle.iconContainer}>
                    <TouchableOpacity style={noteItemHorizontalStyle.iconSmall} onPress={handlePinNote}>
                        <FontAwesome name="paperclip" color={'#06283D'} size={25} />
                    </TouchableOpacity>
                </View>

            </View>
            <Text style={noteItemHorizontalStyle.itemTextName}>{item.title}</Text>
        </TouchableOpacity>
    )
}

export default NoteItem;