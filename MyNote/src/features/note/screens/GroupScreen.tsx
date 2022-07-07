import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, Text } from "react-native";
import { groupStyle } from "../../../assets/style";
import CustomFloatButton from "../../../components/CustomButton/CustomFloatButton";
import { Group } from "../../../models/group";
import { Note } from "../../../models/note";
import GroupMenu from "../components/GroupsMenu";
import NoteItem from "../components/NoteItem";
import NoteOption from "../components/NoteOption";
import { deleteNote, getAllNotes, getGroupList, moveNote } from "../notesApi";

const GroupScreen = ({ route, navigation }) => {
    const { groupName, groupId } = route.params;
    const [notes, setNotes] = useState<Note[]>([]);
    const [groups, setGroups] = useState<Group[]>([])
    const [optionVisible, setOptionVisible] = useState(false);
    const [groupMenuVisible, setGroupMenuVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note>()

    useEffect(() => {
        getAllNotes(setNotes, groupId);
        getGroupList(setGroups)
    }, []);

    const handleOnPress = (item: Note) => {
        navigation.navigate("Note", {
            groupId: groupId,
            note: item,
        });
    }

    const handleOnLongPress = (item: Note) => {
        setOptionVisible(true)
        setCurrentNote(item)
    }

    const handleDeleteNote = (item: Note) => {
        Alert.alert(
            "Delete Note?",
            "Are you sure to delete " + item.title + "?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        console.log(item.id)
                        deleteNote(item.id, groupId)
                    }
                }
            ])
        setOptionVisible(false)
    }

    const navigateToNoteScreen = () => {
        navigation.navigate("Note", {
            groupId: groupId,
            note: undefined
        })
    }

    const moveNoteChose = () => {
        setOptionVisible(false)
        setGroupMenuVisible(true)
    }

    const handleMoveNote = (newGroupId: string) => {
        console.log(currentNote)
        moveNote(currentNote?.id, currentNote?.groupId, newGroupId)
        setGroupMenuVisible(false)
    }

    return (
        <SafeAreaView style={groupStyle.root}>
            <Text style={groupStyle.header}>{groupName}</Text>
            <FlatList data={notes} renderItem={(item) => NoteItem(item, handleOnPress, handleOnLongPress)} numColumns={2} />
            <CustomFloatButton onPress={navigateToNoteScreen} />
            <NoteOption modalVisible={optionVisible} setModalVisible={setOptionVisible} handleDeleteNote={handleDeleteNote} handleMoveNote={moveNoteChose} item={currentNote} />
            <GroupMenu modalVisible={groupMenuVisible} setModalVisible={setGroupMenuVisible} groups={groups} moveNote={handleMoveNote} />
        </SafeAreaView>
    )
}

export default GroupScreen;