import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {  SafeAreaView, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const onLogInPressed = () => {
        console.log("PRESSED");
        navigation.navigate('Home')
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>Login</Text>
            <CustomInput placeHolder="Email" value={email} setValue={setEmail} secureText={false}/>
            <CustomInput placeHolder="Password" value={password} setValue={setPassword} secureText={true}/>
            <CustomButton text="LogIn" onPress={onLogInPressed}/>
        </SafeAreaView>
            
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        marginTop: 100,
        color: '#DFF6FF',
        marginBottom:30
    },
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#06283D',
        height: '100%',
    },
})

export default LoginScreen;