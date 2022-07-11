import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authHeaderStyle } from 'assets/style';
import RootStackParamList from 'constants/type';
import React from "react";
import LoginScreen from "../features/auth/screens/LoginScreen";
import SignupScreen from "../features/auth/screens/SignupScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName={"Login"}>
            <Stack.Screen name="Login" component={LoginScreen} options={authHeaderStyle} />
            <Stack.Screen name="SignUp" component={SignupScreen} options={authHeaderStyle} />
        </Stack.Navigator>
    )
}

export default AuthStack