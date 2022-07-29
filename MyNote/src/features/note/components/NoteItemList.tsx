import { noteItemListStyle } from "assets/style";
import { Note } from "models/note";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { RenderItemParams } from "react-native-draggable-flatlist/lib/types";
import Tts from 'react-native-tts';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { pinNote } from "../notesApi";

const NoteItemList = ({ item, drag, isActive }: RenderItemParams<Note>, handleOnPress: (item: Note) => void) => {
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

    const date = item.timestamp.toDate()

    return (
        <ScaleDecorator>
            <TouchableOpacity style={noteItemListStyle.container} disabled={isActive} onPress={() => handleOnPress(item)} onLongPress={drag}>
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
                <TouchableOpacity style={noteItemListStyle.iconTouch} onPress={handleReadNote}>
                    <FontAwesome name="volume-up" color={'#DFF6FF'} size={24} style={noteItemListStyle.icon} />
                </TouchableOpacity>
            </TouchableOpacity>
        </ScaleDecorator>
    )
}

export default NoteItemList;