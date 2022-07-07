import React from "react";
import { KeyboardTypeOptions, NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData, View } from "react-native";

const CustomInput = ({ value, onChangeText, onBlur, placeHolder, secureText, keyboardType }: { value: string, onChangeText: ((text: string) => void), onBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void), placeHolder: string, secureText: boolean, keyboardType: KeyboardTypeOptions }) => {
    return (
        <View style={style.container}>
            <TextInput style={style.input}
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

const style = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
        borderColor: '#1363DF',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        color: "#DFF6FF"
    }
})

export default CustomInput;