import { inputLargeStyle } from "assets/style";
import React from "react";
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInput, TextInputFocusEventData, View } from "react-native";

const CustomInputLarge = ({ value, onChangeText, onBlur, placeHolder, secureText, keyboardType }: { value: string, onChangeText: ((e: string) => void), onBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void), placeHolder: string, secureText: boolean, keyboardType: KeyboardTypeOptions }) => {
    return (
        <View style={inputLargeStyle.container}>
            <TextInput style={inputLargeStyle.input}
                multiline={true}
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