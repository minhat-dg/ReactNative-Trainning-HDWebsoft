import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CustomFloatButton = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.floatButton} onPress={() => {onPress(true)}}>
            <FontAwesome name="plus" color={'#06283D'} size={25}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    floatButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        position: 'absolute',
        bottom: 15,
        right: 15,
        height: 60,
        backgroundColor: '#DFF6FF',
        borderRadius: 100,
    }
})

export default CustomFloatButton;