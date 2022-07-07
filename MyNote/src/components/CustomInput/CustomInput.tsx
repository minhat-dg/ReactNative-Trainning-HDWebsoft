import React from "react";
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInput, TextInputFocusEventData, View } from "react-native";
import { inputStyle } from "../../assets/style";

const CustomInput = ({ value, onChangeText, onBlur, placeHolder, secureText, keyboardType }: { value: string, onChangeText: ((text: string) => void), onBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void), placeHolder: string, secureText: boolean, keyboardType: KeyboardTypeOptions }) => {
    return (
        <View style={inputStyle.container}>
            <TextInput style={inputStyle.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeHolder} placeholderTextColor='#DFF6FF'
                secureTextEntry={secureText}
                onBlur={onBlur}
                keyboardType={keyboardType}
            ></TextInput>
        </View>
    )
}

export default CustomInput;