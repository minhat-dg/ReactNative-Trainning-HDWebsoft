import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

const CustomButton = ({text, onPress, isValid} : {text: string, onPress: ()=>void, isValid: boolean}) => {
    return(
        <Pressable style={styles.container} onPress={onPress} disabled={!isValid}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1363DF',
        width: '100%',
        marginVertical: 10,
        padding: 15,

        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#DFF6FF'
    }
})

export default CustomButton;