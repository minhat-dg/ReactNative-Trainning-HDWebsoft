import { noteItemStyle } from "assets/style";
import { Note } from "models/note";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Tts from 'react-native-tts';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { pinNote } from "../notesApi";


const NoteItem = ({ item }: { item: Note }, handleOnPress: (item: Note) => void, handleOnLongPress: (item: Note) => void) => {
    const handlePinNote = () => {
        pinNote(item.id, item.pin)
    }

    const handleReadNote = () => {
        if (item.lock) {
            Tts.speak("This note is lock. Please unlock to read")
        } else {
            item.content === ''
                ? Tts.speak("This note is empty")
                : Tts.speak(item.content)
        }
    }

    const style = noteItemStyle(2)
    const date = item.timestamp.toDate()

    return (
        <TouchableOpacity style={style.itemContainer} onPress={() => handleOnPress(item)} onLongPress={() => handleOnLongPress(item)}>
            <View style={style.itemCard}>
                <View style={style.iconContainer}>
                    <TouchableOpacity style={style.iconSmall} onPress={handlePinNote}>
                        <FontAwesome name="paperclip" color={'#06283D'} size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.iconSmall} onPress={handleReadNote}>
                        <FontAwesome name="volume-up" color={'#06283D'} size={24} />
                    </TouchableOpacity>
                </View>
                {item.lock ?
                    <FontAwesome name="lock" color={'#06283D'} size={40} style={style.iconLarge} />
                    : <Text style={style.itemTextDescription}>{item.content}</Text>
                }
                <Text style={style.timestamp}>{date.toLocaleTimeString()} - {date.toDateString()}</Text>
            </View>
            <Text style={style.itemTextName} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
    )
}

export default NoteItem;