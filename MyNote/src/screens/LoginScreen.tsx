import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    GoogleSignin.configure({
        webClientId: '504738882802-oo8l931hqhg0u6s4pu8gl957ok2rsvdi.apps.googleusercontent.com',
    });

    const handleLogin = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                navigation.navigate('Home')
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

    const handleNavSignup = () => {
        navigation.navigate('Signup')
    }


    const onGoogleButtonPress = async() => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    const handleGoogleLogin = () => {
        onGoogleButtonPress().then(() => {
            console.log('Signed in with Google!');
            navigation.navigate('Home')
        })
    }

    const onFacebookButtonPress = async() => {
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
        return auth().signInWithCredential(facebookCredential).then(()=>{
            console.log("OK")
        }).catch((error) => {
            console.log(error)
        });
      }

    const handleFacebookLogin = () => {
        onFacebookButtonPress().catch((error) => {
            console.log(error);
            
        })
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>Login</Text>
            <CustomInput placeHolder="Email" value={email} setValue={setEmail} secureText={false} />
            <CustomInput placeHolder="Password" value={password} setValue={setPassword} secureText={true} />
            <CustomButton text="LogIn" onPress={handleLogin} />
            <Text style={styles.caption}>or</Text>
            <View style={styles.iconContainer}>
                <FontAwesome name="google-plus-square" color={'#1363DF'} size={30} onPress={handleGoogleLogin} />
                <FontAwesome name="facebook-official" color={'#1363DF'} size={30} onPress={handleFacebookLogin} />
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