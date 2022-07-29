import { floatButtonStyle } from "assets/style";
import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const CustomFloatButton = ({ onPress }: { onPress: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <TouchableOpacity style={floatButtonStyle.floatButton} onPress={() => { onPress(true) }}>
            <FontAwesome name="plus" color={'#06283D'} size={25} />
        </TouchableOpacity>
    )
}



export default CustomFloatButton;