import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CustomButtonBorder = ({text, onPress} : {text: string, onPress: ()=>void}) => {
    return(
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#1363DF',
        borderWidth: 1,
        width: '100%',
        marginVertical: 0,
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

export default CustomButtonBorder;