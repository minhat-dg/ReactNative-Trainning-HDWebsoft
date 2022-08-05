import { customButtonBorderStyle } from "assets/style";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const CustomButtonBorder = ({ text, onPress }: { text: string, onPress: () => void }) => {
    return (
        <TouchableOpacity style={customButtonBorderStyle.container} onPress={onPress}>
            <Text style={customButtonBorderStyle.text}>{text}</Text>
        </TouchableOpacity>
    )
}


export default CustomButtonBorder;