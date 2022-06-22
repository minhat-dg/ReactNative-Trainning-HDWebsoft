import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignUpPressed = () => {
        navigation.navigate('Home')
    }

    const handleLogIn = () => {
        navigation.navigate('Login')
    }
    
    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>SignUp</Text>
            <CustomInput placeHolder="Email" value={email} setValue={setEmail} secureText={false} />
            <CustomInput placeHolder="Password" value={password} setValue={setPassword} secureText={true} />
            <CustomButton text="SignUp" onPress={onSignUpPressed} />
            
            <Text style={styles.textContainer}>
                <Text style={styles.caption}>Already have an account? </Text>
                <Text style={styles.signup} onPress={handleLogIn}>LogIn</Text>
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        marginTop: 100,
        color: '#DFF6FF',
        marginBottom: 30
    },
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#06283D',
        height: '100%',
    },
    caption: {
        color: '#DFF6FF',
        fontWeight: 'normal',
        fontSize: 16,
        marginBottom: 20
    },
    textContainer: {
        textAlignVertical: 'bottom',
        flex: 1,
    },
    signup: {
        color: '#1363DF',
        fontWeight: 'bold',
        fontSize: 16
    },
})

export default SignupScreen;