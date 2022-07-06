import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomFloatButton from "../../../components/CustomButton/CustomFloatButton";
import { deleteNote, getAllNotes } from "../notesApi";

const GroupScreen = ({ route, navigation }) => {
    const { groupName, groupId, count } = route.params;
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getAllNotes(setNotes, groupId);
    }, []);

    const renderNotes = ({ item }) => {
        const handleGroupPress = () => {
            navigation.navigate("Note", { 
                groupId: groupId, 
                count : count,
                note: item ,
            });
        }

        const handleDeleteNote = () => {
            Alert.alert(
                "Delete Note?",
                "Are you sure to delete this note?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            console.log(item.id)
                            deleteNote(item.id, groupId, count)
                        }
                    }
                ])
        }

        return (
            <TouchableOpacity style={styles.itemContainer} onPress={handleGroupPress} onLongPress={handleDeleteNote}>
                <View style={styles.itemCard}>
                    <Text style={styles.itemTextDescription}>{item.content}</Text>
                </View>
                <Text style={styles.itemTextName}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const navigateToNoteScreen = () => {
        navigation.navigate("Note", {
            groupId: groupId, 
            count: count,
            note: undefined
        })
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>{groupName}</Text>
            <FlatList data={notes} renderItem={renderNotes} numColumns={2} />
            <CustomFloatButton onPress={navigateToNoteScreen} />
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