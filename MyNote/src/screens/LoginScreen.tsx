import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const onLogInPressed = () => {
        navigation.navigate('Home')
    }

    const handleSignup = () => {
        navigation.navigate('Signup')
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>Login</Text>
            <CustomInput placeHolder="Email" value={email} setValue={setEmail} secureText={false} />
            <CustomInput placeHolder="Password" value={password} setValue={setPassword} secureText={true} />
            <CustomButton text="LogIn" onPress={onLogInPressed} />
            <Text style={styles.caption}>or</Text>
            <View style={styles.iconContainer}>
                <FontAwesome name="google-plus-square" color={'#1363DF'} size={30} />
                <FontAwesome name="facebook-official" color={'#1363DF'} size={30} />
            </View>
            <Text style={styles.textContainer}>
                <Text style={styles.caption}>Don't have an account? </Text>
                <Text style={styles.signup} onPress={handleSignup}>SignUp</Text>
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
    iconContainer: {
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'space-between'
    }
})

export default LoginScreen;