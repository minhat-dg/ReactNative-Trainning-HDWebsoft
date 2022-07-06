import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import CustomFloatButton from "../../../components/CustomButton/CustomFloatButton";
import GroupMenu from "../components/GroupsMenu";
import NoteItem from "../components/NoteItem";
import NoteOption from "../components/NoteOption";
import { deleteNote, getAllNotes, getGroupList, moveNote } from "../notesApi";

const GroupScreen = ({ route, navigation }) => {
    const { groupName, groupId } = route.params;
    const [notes, setNotes] = useState([]);
    const [groups, setGroups] = useState([])
    const [optionVisible, setOptionVisible] = useState(false);
    const [groupMenuVisible, setGroupMenuVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState()

    useEffect(() => {
        getAllNotes(setNotes, groupId);
        getGroupList(setGroups)
    }, []);

    const handleOnPress = (item) => {
        navigation.navigate("Note", {
            groupId: groupId,
            note: item,
        });
    }

    const handleOnLongPress = (item) => {
        setOptionVisible(true)
        setCurrentNote(item)
    }

    const handleDeleteNote = (item) => {
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

    const handleMoveNote = (newGroupId) => {
        console.log(currentNote)
        moveNote(currentNote.id, currentNote.groupId, newGroupId)
        setGroupMenuVisible(false)
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>{groupName}</Text>
            <FlatList data={notes} renderItem={(item) => NoteItem(item, handleOnPress, handleOnLongPress)} numColumns={2} />
            <CustomFloatButton onPress={navigateToNoteScreen} />
            <NoteOption modalVisible={optionVisible} setModalVisible={setOptionVisible} handleDeleteNote={handleDeleteNote} handleMoveNote={moveNoteChose} item={currentNote} />
            <GroupMenu modalVisible={groupMenuVisible} setModalVisible={setGroupMenuVisible} groups={groups} moveNote={handleMoveNote} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 10,
        backgroundColor: '#06283D',
        height: '100%',
    },
    header: {
        fontWeight: '500',
        fontSize: 25,
        color: '#DFF6FF',
        marginBottom: 20
    },
    itemContainer: {
        flex: 0.5,
        alignItems: 'center',
        padding: 10
    },
    itemCard: {
        backgroundColor: '#47B5FF',
        borderRadius: 10,
        height: 150,
        width: '100%',
        alignItems: 'center',
        padding: 5
    },
    itemTextName: {
        color: '#DFF6FF',
        fontSize: 20,
        fontWeight: '500',
    },
    itemTextDescription: {
        color: '#06283D',
        fontSize: 16,
        fontWeight: 'normal',
        marginTop: 5,
        flexShrink: 1
    },
})


export default GroupScreen;