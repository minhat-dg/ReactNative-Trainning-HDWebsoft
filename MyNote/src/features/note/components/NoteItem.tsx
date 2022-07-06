import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NoteMenu from "./NoteOption";

const NoteItem = ({ item }, handleOnPress, handleOnLongPress) => {

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={()=> handleOnPress(item)} onLongPress={() => handleOnLongPress(item)}>
            <View style={styles.itemCard}>
                <Text style={styles.itemTextDescription}>{item.content}</Text>
            </View>
            <Text style={styles.itemTextName}>{item.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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

export default NoteItem;