import React from "react";
import { Pressable, Text } from "react-native";
import { customButtonBorderStyle } from "assets/style";

const CustomButtonBorder = ({ text, onPress }: { text: string, onPress: () => void }) => {
    return (
        <Pressable style={customButtonBorderStyle.container} onPress={onPress}>
            <Text style={customButtonBorderStyle.text}>{text}</Text>
        </Pressable>
    )
}


export default CustomButtonBorder;