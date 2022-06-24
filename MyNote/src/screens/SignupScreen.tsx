import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import auth from "@react-native-firebase/auth";

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignUp = () => {
        console.log("PRESSED SIGNUP")
        console.log(email + " " + password)

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                navigation.navigate('Home');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    const handleNavLogIn = () => {
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>SignUp</Text>
            <CustomInput placeHolder="Email" value={email} setValue={setEmail} secureText={false} />
            <CustomInput placeHolder="Password" value={password} setValue={setPassword} secureText={true} />
            <CustomButton text="SignUp" onPress={handleSignUp} />
            <Text style={styles.textContainer}>
                <Text style={styles.caption}>Already have an account? </Text>
                <Text style={styles.signup} onPress={handleNavLogIn}>LogIn</Text>
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