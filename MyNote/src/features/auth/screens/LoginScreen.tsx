import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useAppDispatch, useAppSelector } from "app/hook";
import { loginStyle } from "assets/style";
import CustomButton from "components/CustomButton/CustomButton";
import CustomInput from "components/CustomInput/CustomInput";
import ProgressBar from "components/ProgressBar/ProgressBar";
import RootStackParamList from "constants/type";
import { Formik } from "formik";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import { authActions } from "../authSlice";


type LoginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenProps>();
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
        navigation.navigate('SignUp')
    }

    const handleLogin = ({ email, password }: { email: string, password: string }) => {
        dispatch(authActions.login({
            type: 'email',
            email: email,
            password: password
        }))
    }

    return (
        <SafeAreaView style={loginStyle.root}>
            <Text style={loginStyle.header}>Login</Text>
            <Formik initialValues={loginInfo}
                validationSchema={loginValidationSchema}
                onSubmit={value => { handleLogin(value) }}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, }) => (
                    <>
                        <CustomInput placeHolder="Email" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} secureText={false} keyboardType='email-address' />
                        {errors.email &&
                            <Text style={loginStyle.error}>{errors.email}</Text>
                        }
                        <CustomInput placeHolder="Password" value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('email')} secureText={true} keyboardType='default' />
                        {errors.password &&
                            <Text style={loginStyle.error}>{errors.password}</Text>
                        }
                        <CustomButton text="LogIn" onPress={handleSubmit} isValid={isValid} />
                    </>

                )}
            </Formik>
            <Text style={loginStyle.caption}>or</Text>
            <View style={loginStyle.iconContainer}>
                <FontAwesome name="google-plus-square" color={'#1363DF'} size={30} onPress={handleGooglePress} />
                <FontAwesome name="facebook-official" color={'#1363DF'} size={30} onPress={handleFacebookPress} />
            </View>
            <Text style={loginStyle.textContainer}>
                <Text style={loginStyle.caption}>Don't have an account? </Text>
                <Text style={loginStyle.signup} onPress={handleNavSignup}>SignUp</Text>
            </Text>
            {isLogging ? <ProgressBar /> : <View></View>}
        </SafeAreaView>

    )
}



export default LoginScreen;