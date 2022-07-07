import { StyleSheet, Text, TextInput, View } from "react-native"
import React from "react";

const CustomInputLarge = ({ value, onChangeText, onBlur, placeHolder, secureText, keyboardType }: { value: string, onChangeText: ((text: string) => void), onBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void), placeHolder: string, secureText: boolean, keyboardType: KeyboardTypeOptions }) => {
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
        marginVertical: 5,
        borderColor: '#1363DF',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        flex: 1,
        alignItems: 'flex-start'
    },
    input: {
        color: "#DFF6FF",
        flex: 1,
        textAlign: 'left',
        textAlignVertical: 'top',
        width: '100%'
    }
})

export default CustomInputLarge;