import { noteItemStyle } from "assets/style";
import { Note } from "models/note";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { pinNote } from "../notesApi";

const NoteItem = ({ item }: { item: Note }, handleOnPress: (item: Note) => void, handleOnLongPress: (item: Note) => void) => {
    const handlePinNote = () => {
        pinNote(item.id, item.pin)
    }

    const style = noteItemStyle(2)
    const date = item.timestamp.toDate()

    return (
        <TouchableOpacity style={style.itemContainer} onPress={() => handleOnPress(item)} onLongPress={() => handleOnLongPress(item)}>
            <View style={style.itemCard}>
                {item.lock ?
                    <FontAwesome name="lock" color={'#06283D'} size={50} style={style.iconLarge} />
                    : <Text style={style.itemTextDescription}>{item.content}</Text>
                }
                <View style={style.iconContainer}>
                    <Text style={style.timestamp}>{date.toLocaleTimeString()} - {date.toDateString()}</Text>
                    <TouchableOpacity style={style.iconSmall} onPress={handlePinNote}>
                        <FontAwesome name="paperclip" color={'#06283D'} size={25} />
                    </TouchableOpacity>
                </View>

            </View>
            <Text style={style.itemTextName} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
    )
}

export default NoteItem;