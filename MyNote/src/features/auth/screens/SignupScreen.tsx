import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { authActions } from "../authSlice";

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const isLogging = useAppSelector(state => state.auth.logging)

    const handleSignUpPress = () => {
        dispatch(authActions.login({
            type: 'signup',
            email: email,
            password: password
        }))
    }

    const handleNavLogIn = () => {
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>SignUp</Text>
            <CustomInput placeHolder="Email" value={email} setValue={setEmail} secureText={false} />
            <CustomInput placeHolder="Password" value={password} setValue={setPassword} secureText={true} />
            <CustomButton text="SignUp" onPress={handleSignUpPress} />
            <Text style={styles.textContainer}>
                <Text style={styles.caption}>Already have an account? </Text>
                <Text style={styles.signup} onPress={handleNavLogIn}>LogIn</Text>
            </Text>
            {isLogging ? <ProgressBar /> : <View></View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        marginTop: 100,
        color: '#DFF6FF',
        marginBottom: 30,
    },
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#06283D',
        height: '100%',
        justifyContent: 'center'
    },
    caption: {
        color: '#DFF6FF',
        fontWeight: 'normal',
        fontSize: 16,
    },
    textContainer: {
        textAlignVertical: 'bottom',
        flex: 1,
    },
    signup: {
        color: '#1363DF',
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default SignupScreen;