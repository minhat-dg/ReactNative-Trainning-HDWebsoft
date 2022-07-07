import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { authActions } from "../authSlice";

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector(state => state.auth.logging)

    const loginInfo = {
        email: '',
        password: ''
    }

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(6, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    })

    const handleGooglePress = () => {
        dispatch(authActions.login({
            type: 'google',
            email: '',
            password: ''
        }))
    }

    const handleFacebookPress = () => {
        dispatch(authActions.login({
            type: 'facebook',
            email: '',
            password: ''
        }))
    }

    const handleNavSignup = () => {
        navigation.navigate('Signup')
    }

    const handleLogin = ({ email, password }) => {
        dispatch(authActions.login({
            type: 'email',
            email: email,
            password: password
        }))
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>Login</Text>
            <Formik initialValues={loginInfo}
                validationSchema={loginValidationSchema}
                onSubmit={value => { handleLogin(value) }}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, }) => (
                    <>
                        <CustomInput placeHolder="Email" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} secureText={false} keyboardType='email-address' />
                        {errors.email &&
                            <Text style={styles.error}>{errors.email}</Text>
                        }
                        <CustomInput placeHolder="Password" value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('email')} secureText={true} keyboardType='default' />
                        {errors.password &&
                            <Text style={styles.error}>{errors.password}</Text>
                        }
                        <CustomButton text="LogIn" onPress={handleSubmit} isValid={isValid} />
                    </>

                )}
            </Formik>
            <Text style={styles.caption}>or</Text>
            <View style={styles.iconContainer}>
                <FontAwesome name="google-plus-square" color={'#1363DF'} size={30} onPress={handleGooglePress} />
                <FontAwesome name="facebook-official" color={'#1363DF'} size={30} onPress={handleFacebookPress} />
            </View>
            <Text style={styles.textContainer}>
                <Text style={styles.caption}>Don't have an account? </Text>
                <Text style={styles.signup} onPress={handleNavSignup}>SignUp</Text>
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
    },
    error: {
        fontSize: 12,
        color: 'red'
    }
})

export default LoginScreen;