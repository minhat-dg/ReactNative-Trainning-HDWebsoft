import { StyleSheet, Text, TextInput, View } from "react-native"
import React from "react";

const CustomInput = ({value, setValue, placeHolder, secureText}: {value: string, setValue: (text: string) => void, placeHolder: string, secureText: boolean}) => {
    return (
        <View style={style.container}>
            <TextInput style={style.input}
                value={value}
                onChangeText={setValue}
                placeholder={placeHolder} placeholderTextColor='#DFF6FF'
                secureTextEntry={secureText}
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
    },
    input: {
        color: "#DFF6FF"
    }
})

export default CustomInput;