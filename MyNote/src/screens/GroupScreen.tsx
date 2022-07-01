import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomFloatButton from "../components/CustomButton/CustomFloatButton";

const data = [
    {
        name: "NOTE 1",
        description: "Note about the study",
        noteCount: 1,
    },
    {
        name: "NOTE 1",
        description: "Note about the study aaa aaaaaa aaaaaaaaa aaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaa aaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaa aaaaaaa aaaaaaaaa bbbbbbbbb",
        noteCount: 2,
    },
    {
        name: "NOTE 1",
        description: "Note about the study",
        noteCount: 2,
    },
    {
        name: "NOTE 1",
        description: "Note about the study",
        noteCount: 2,
    },
    {
        name: "NOTE 1",
        description: "Note about the study",
        noteCount: 2,
    },
    {
        name: "NOTE 1",
        description: "Note about the study",
        noteCount: 2,
    },
    {
        name: "NOTE 1",
        description: "Note about the study",
        noteCount: 2,
    },
    {
        name: "NOTE 1",
        description: "Note about the study",
        noteCount: 2,
    },
    {
        name: "NOTE 1",
        description: "Note about the study",
        noteCount: 2,
    },
    {
        name: "NOTE 1",
        description: "Note about the study",
        noteCount: 2,
    },
    {
        name: "NOTE 1",
        description: "Note about the study",
        noteCount: 2,
    },

]

const GroupScreen = ({navigation}) => {
    const [noteGroups, setNoteGroups] = useState(data);

    const renderNoteGroup = ({item}) => {
        const handleGroupPress = () => {
            console.log("navigate with item: " + item)
            navigation.navigate("Note", {note: item});
        }

        return (
            <TouchableOpacity style={styles.itemContainer} onPress={handleGroupPress}>
                <View style={styles.itemCard}>
                    <Text style={styles.itemTextDescription}>{item.description}</Text>
                </View>
                <Text style={styles.itemTextName}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const navigateToNoteScreen = (check: boolean) => {
        navigation.navigate("Note", {})
    }
    
    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>Group Name</Text>
            <FlatList data={noteGroups} renderItem={renderNoteGroup} numColumns={2}/>
            <CustomFloatButton onPress={navigateToNoteScreen}/>
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
    itemContainer:{
        flex: 0.5,
        alignItems: 'center',
        padding: 10
    },
    itemCard:{
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