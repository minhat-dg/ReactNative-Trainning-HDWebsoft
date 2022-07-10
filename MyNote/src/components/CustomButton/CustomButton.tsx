import React from "react";
import { Pressable, Text } from "react-native";
import { customButtonStyle } from 'assets/style';

const CustomButton = ({ text, onPress, isValid }: { text: string, onPress: () => void, isValid: boolean }) => {
    return (
        <Pressable style={customButtonStyle.container} onPress={onPress} disabled={!isValid}>
            <Text style={customButtonStyle.text}>{text}</Text>
        </Pressable>
    )
}


export default CustomButton;