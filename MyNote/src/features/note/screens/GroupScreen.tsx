import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, SafeAreaView, Text } from "react-native";
import { groupStyle } from "../../../assets/style";
import CustomFloatButton from "../../../components/CustomButton/CustomFloatButton";
import HeaderSearchBar from "../../../components/HeaderSearchBar/HeaderSearchBar";
import { Group } from "../../../models/group";
import { Note } from "../../../models/note";
import GroupMenu from "../components/GroupsMenu";
import NoteItem from "../components/NoteItem";
import NoteOption from "../components/NoteOption";
import { deleteNote, getAllNotes, getGroupList, moveNote } from "../notesApi";

const GroupScreen = ({ route, navigation }) => {
    const { groupName, groupId } = route.params;
    const [notes, setNotes] = useState<Note[]>([]);
    const [search, setSearch] = useState('')
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
    const [groups, setGroups] = useState<Group[]>([])
    const [optionVisible, setOptionVisible] = useState(false);
    const [groupMenuVisible, setGroupMenuVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note>()
    const timeOutRef = useRef<ReturnType<typeof setTimeout>|null>(null)

    useEffect(() => {
        const sub = getAllNotes(setNotes, setFilteredNotes, groupId);
        getGroupList(setGroups);
        navigation.setOptions({
            headerTitle: groupName
        });
        return () => {
            sub()
        }
    }, [])

    const handleChangeSearch = (text: string) => {
        setSearch(text)
        debounceSearch(text, 500)
    }

    const debounceSearch = (text: string, delay: number) => {
        if(timeOutRef.current) {
            clearTimeout(timeOutRef.current)
        }
        timeOutRef.current = setTimeout(() =>{
            filterNotes(text);
        }, delay);
    }

    const filterNotes = (text: string) => {
        console.log(text)
        if (text !== '') {
            const newNotes = notes.filter(note => {
                const noteData = note.title.toLocaleLowerCase();
                const textData = text.toLowerCase();
                return noteData.indexOf(textData) > -1;
            })
            setFilteredNotes(newNotes)
        } else {
            setFilteredNotes(notes)
        }
    }


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
            <HeaderSearchBar value={search} onChangeText={handleChangeSearch} />
            <FlatList data={filteredNotes} renderItem={(item) => NoteItem(item, handleOnPress, handleOnLongPress)} numColumns={2} />
            <CustomFloatButton onPress={navigateToNoteScreen} />
            <NoteOption modalVisible={optionVisible} setModalVisible={setOptionVisible} handleDeleteNote={handleDeleteNote} handleMoveNote={moveNoteChose} item={currentNote} />
            <GroupMenu modalVisible={groupMenuVisible} setModalVisible={setGroupMenuVisible} groups={groups} moveNote={handleMoveNote} />
        </SafeAreaView>
    )
}

export default GroupScreen;