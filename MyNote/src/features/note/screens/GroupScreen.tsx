import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { groupStyle } from "assets/style";
import CustomFloatButton from "components/CustomButton/CustomFloatButton";
import HeaderSearchBar from "components/HeaderSearchBar/HeaderSearchBar";
import RootStackParamList from "constants/type";
import { Group } from "models/group";
import { Note } from "models/note";
import React, { useEffect, useRef, useState } from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList, { DragEndParams } from "react-native-draggable-flatlist";
import Tts from 'react-native-tts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GroupMenu from "../components/GroupsMenu";
import NoteItem from "../components/NoteItem";
import NoteItemList from "../components/NoteItemList";
import NoteOption from '../components/NoteOption';
import { deleteNote, getFirstPageNotes, getGroupList, getMoreNotes, moveNote, setNewLast, updateOrder } from "../notesApi";

type HomeGroupScreenProps = NativeStackScreenProps<RootStackParamList, 'Group'>

const GroupScreen = ({ route, navigation }: { navigation: HomeGroupScreenProps['navigation'], route: HomeGroupScreenProps['route'] }) => {
    const { groupName, groupId } = route.params;
    const [listView, setListView] = useState(false)
    const [notes, setNotes] = useState<Note[]>([]);
    const [lastNote, setLastNote] = useState<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>>();
    const [search, setSearch] = useState('');
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
    const [pinnedNotes, setPinnedNote] = useState<Note[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [optionVisible, setOptionVisible] = useState(false);
    const [groupMenuVisible, setGroupMenuVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note>();
    const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [changingOrder, setChangingOrder] = useState(false);
    const limitItem = 10;

    useEffect(() => {
        if (changingOrder) return;
        console.log("Sub")
        const sub = getFirstPageNotes(setNotes, setFilteredNotes, groupId, limitItem, setLastNote);
        getGroupList(setGroups);
        return sub;
    }, [changingOrder])

    useEffect(() => {
        getPinnedNotes();
    }, [notes])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: groupName,
            headerRight() {
                return (
                    <TouchableOpacity onPress={() => handleChangeView()}>
                        {
                            listView ?
                                <FontAwesome name="table" color={'#DFF6FF'} size={20} />
                                : <FontAwesome name="list" color={'#DFF6FF'} size={20} />
                        }
                    </TouchableOpacity>

                )
            }
        });
    }, [listView])

    const handleChangeView = () => {
        setListView(!listView)
    }

    const getPinnedNotes = () => {
        const newPinnedNote = notes.filter(note => note.pin)
        const newNotes = notes.filter(note => !newPinnedNote.includes(note))
        setFilteredNotes(newNotes)
        setPinnedNote(newPinnedNote)
    }

    const updatePinnedNotes = (newNotes: Note[]) => {
        const pinnedNotes = newNotes.filter(note => note.pin)
        const newFilterd = newNotes.filter(note => !pinnedNotes.includes(note))
        setFilteredNotes(newFilterd)
        setPinnedNote(pinnedNotes)
    }

    const handleChangeSearch = (text: string) => {
        setSearch(text)
        debounceSearch(text, 500)
    }

    const debounceSearch = (text: string, delay: number) => {
        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current)
        }
        timeOutRef.current = setTimeout(() => {
            filterNotes(text);
        }, delay)
    }

    const filterNotes = (text: string) => {
        let newNotes = notes
        if (text !== '') {
            newNotes = notes.filter(note => {
                const noteTitle = note.title.toLocaleLowerCase();
                const noteContent = note.content.toLocaleLowerCase();
                const textData = text.toLowerCase();
                return (noteTitle.indexOf(textData) > -1) || (noteContent.indexOf(textData) > -1);
            })
        }
        updatePinnedNotes(newNotes);
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

    const handleDelete = (id: string) => {
        if (id === lastNote?.id) {
            const newLatsId = notes[notes.length - 2].id;
            setNewLast(groupId, newLatsId, setLastNote);
        }
        setNotes(notes => {
            notes.forEach(item => {
                if (item.id === id) {
                    notes.splice(notes.indexOf(item), 1);
                }
            })
            return notes;
        })
        notes.forEach(item => {
            updateOrder(item.id, notes.length - notes.indexOf(item) - 1)
        })

        deleteNote(id, groupId)
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
                        handleDelete(item.id);
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
        moveNote(currentNote?.id, currentNote?.groupId, newGroupId)
        setGroupMenuVisible(false)
    }

    const handleLoadMore = () => {
        if (lastNote) {
            getMoreNotes(setNotes, setFilteredNotes, groupId, limitItem, setLastNote, lastNote)
        }
    }

    const updateOrderList = async (data: Note[], from: number, to: number) => {
        setChangingOrder(true);
        if (from === to) return
        from > to ? ([from, to] = [to, from]) : false
        await Promise.all(
            data.map(item => {
                const idx = data.indexOf(item);
                if (idx >= from && idx <= to) {
                    console.log("Updating ", item.title)
                    return updateOrder(item.id, data.length - data.indexOf(item) - 1)
                }
            })
            // for(let i = (from<to?from:to); i <= (from>to?from:to); i++){
            //     return updateOrder(data[i].id, i)
            // }
        )
        console.log("Update completed")
        setChangingOrder(false)
    }

    return (
        <SafeAreaView style={groupStyle.root}>
            <HeaderSearchBar value={search} onChangeText={handleChangeSearch} />
            {pinnedNotes.length > 0 ?
                <View style={groupStyle.pinContainer}>
                    <Text style={groupStyle.header}>Pinned:</Text>

                    {listView ?
                        <DraggableFlatList containerStyle={groupStyle.listContainer} key={1} onEndReached={handleLoadMore} numColumns={1} data={pinnedNotes} onDragEnd={(params: DragEndParams<Note>) => updateOrderList(params.data, params.from, params.to)} keyExtractor={(item) => item.id} renderItem={item => NoteItemList(item, handleOnPress, Tts)} />
                        : <DraggableFlatList containerStyle={groupStyle.listContainer} key={2} onEndReached={handleLoadMore} numColumns={2} data={pinnedNotes} onDragEnd={(params: DragEndParams<Note>) => updateOrderList(params.data, params.from, params.to)} keyExtractor={(item) => item.id} renderItem={item => NoteItem(item, handleOnPress, handleOnLongPress, Tts)} />
                    }
                </View>
                : <></>
            }
            <View style={groupStyle.noteContainer}>
                <Text style={groupStyle.header}>Notes:</Text>
                {listView ?
                    <DraggableFlatList key={1} onEndReached={handleLoadMore} containerStyle={groupStyle.listContainer} numColumns={1} data={filteredNotes} onDragEnd={(params: DragEndParams<Note>) => { setNotes(params.data); updateOrderList(params.data, params.from, params.to) }} keyExtractor={(item) => item.id} renderItem={item => NoteItemList(item, handleOnPress, Tts)} />
                    : <DraggableFlatList key={2} onEndReached={handleLoadMore} containerStyle={groupStyle.listContainer} numColumns={2} data={filteredNotes} onDragEnd={(params: DragEndParams<Note>) => updateOrderList(params.data, params.from, params.to)} keyExtractor={(item) => item.id} renderItem={item => NoteItem(item, handleOnPress, handleOnLongPress, Tts)} />
                }
            </View>
            <CustomFloatButton onPress={navigateToNoteScreen} />
            {currentNote !== undefined ? <NoteOption modalVisible={optionVisible} setModalVisible={setOptionVisible} handleDeleteNote={handleDeleteNote} handleMoveNote={moveNoteChose} item={currentNote} /> : <View />}
            <GroupMenu modalVisible={groupMenuVisible} setModalVisible={setGroupMenuVisible} groups={groups} moveNote={handleMoveNote} />
        </SafeAreaView>
    )
}

export default GroupScreen;