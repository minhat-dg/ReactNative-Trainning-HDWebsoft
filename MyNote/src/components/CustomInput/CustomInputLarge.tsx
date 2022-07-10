import React from "react";
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInput, TextInputFocusEventData, View } from "react-native";
import { inputLargeStyle } from "assets/style";

const CustomInputLarge = ({ value, onChangeText, onBlur, placeHolder, secureText, keyboardType }: { value: string, onChangeText: ((text: string) => void), onBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void), placeHolder: string, secureText: boolean, keyboardType: KeyboardTypeOptions }) => {
    return (
        <View style={inputLargeStyle.container}>
            <TextInput style={inputLargeStyle.input}
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

export default CustomInputLarge;