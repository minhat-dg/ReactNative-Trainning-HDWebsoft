import { customButtonStyle } from 'assets/style';
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({ text, onPress, isValid }: { text: string, onPress: () => void, isValid: boolean }) => {
    return (
        <TouchableOpacity style={customButtonStyle.container} onPress={onPress} disabled={!isValid}>
            <Text style={customButtonStyle.text}>{text}</Text>
        </TouchableOpacity>
    )
}


export default CustomButton;