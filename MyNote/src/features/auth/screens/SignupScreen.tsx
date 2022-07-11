import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { signupStyle } from "assets/style";
import CustomButton from "components/CustomButton/CustomButton";
import CustomInput from "components/CustomInput/CustomInput";
import ProgressBar from "components/ProgressBar/ProgressBar";
import RootStackParamList from "constants/type";
import { Formik } from "formik";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { authActions } from "../authSlice";

type SignUpScreenProps = NativeStackNavigationProp<RootStackParamList, 'SignUp'>

const SignupScreen = ({ navigation }: { navigation: SignUpScreenProps }) => {
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

    const handleSignUp = ({ email, password }: { email: string, password: string }) => {
        dispatch(authActions.login({
            type: 'signup',
            email: email,
            password: password
        }))
    }

    return (
        <SafeAreaView style={signupStyle.root}>
            <Text style={signupStyle.header}>SignUp</Text>
            <Formik initialValues={signupInfo}
                validationSchema={signupValidationSchema}
                onSubmit={value => { handleSignUp(value) }}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, }) => (
                    <>
                        <CustomInput placeHolder="Email" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} secureText={false} keyboardType='email-address' />
                        {errors.email &&
                            <Text style={signupStyle.error}>{errors.email}</Text>
                        }
                        <CustomInput placeHolder="Password" value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('email')} secureText={true} keyboardType='default' />
                        {errors.password &&
                            <Text style={signupStyle.error}>{errors.password}</Text>
                        }
                        <CustomButton text="SignUp" onPress={handleSubmit} isValid={isValid} />
                    </>

                )}
            </Formik>
            <Text style={signupStyle.textContainer}>
                <Text style={signupStyle.caption}>Already have an account? </Text>
                <Text style={signupStyle.signup} onPress={handleNavLogIn}>LogIn</Text>
            </Text>
            {isLogging ? <ProgressBar /> : <View></View>}
        </SafeAreaView>
    )
}


export default SignupScreen;