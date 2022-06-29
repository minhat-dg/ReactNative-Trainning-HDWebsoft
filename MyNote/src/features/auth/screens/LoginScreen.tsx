import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch } from "../../../app/hook";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import { authActions } from "../authSlice";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const handleLoginPress = () => {
        dispatch(authActions.login({
            type: 'email',
            email: email,
            password: password
        }))
    }

    const handleNavSignup = () => {
        navigation.navigate('Signup')
    }

    const handleGooglePress = () => {
        dispatch(authActions.login({
            type: 'google',
            email: '',
            password: ''
        }))
    }

    const onFacebookButtonPress = async () => {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        console.log(facebookCredential)

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential).then(() => {
            navigation.navigate('Home')
        }).catch((error) => {
            console.log(error)
        });
    }

    const handleFacebookLogin = () => {
        onFacebookButtonPress().catch((error) => {
            console.log(error);
        })
    }

    const handleFacebookPress = () => {
        dispatch(authActions.login({
            type: 'facebook',
            email: '',
            password: ''
        }))
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>Login</Text>
            <CustomInput placeHolder="Email" value={email} setValue={setEmail} secureText={false} />
            <CustomInput placeHolder="Password" value={password} setValue={setPassword} secureText={true} />
            <CustomButton text="LogIn" onPress={handleLoginPress} />
            <Text style={styles.caption}>or</Text>
            <View style={styles.iconContainer}>
                <FontAwesome name="google-plus-square" color={'#1363DF'} size={30} onPress={handleGooglePress} />
                <FontAwesome name="facebook-official" color={'#1363DF'} size={30} onPress={handleFacebookPress} />
            </View>
            <Text style={styles.textContainer}>
                <Text style={styles.caption}>Don't have an account? </Text>
                <Text style={styles.signup} onPress={handleNavSignup}>SignUp</Text>
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