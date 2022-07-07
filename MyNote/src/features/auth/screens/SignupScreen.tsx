import { Formik } from "formik";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { authActions } from "../authSlice";

const SignupScreen = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector(state => state.auth.logging)

    const signupInfo = {
        email: '',
        password: ''
    }

    const signupValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(6, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    })

    const handleNavLogIn = () => {
        navigation.navigate('Login')
    }

    const handleSignUp = ({ email, password }) => {
        dispatch(authActions.login({
            type: 'signup',
            email: email,
            password: password
        }))
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.header}>SignUp</Text>
            <Formik initialValues={signupInfo}
                validationSchema={signupValidationSchema}
                onSubmit={value => { handleSignUp(value) }}>
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
                        <CustomButton text="SignUp" onPress={handleSubmit} isValid={isValid} />
                    </>

                )}
            </Formik>
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
    },
    error: {
        fontSize: 12,
        color: 'red'
    }
})

export default SignupScreen;