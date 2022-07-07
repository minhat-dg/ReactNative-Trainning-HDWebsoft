import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import { authHeaderStyle } from '../assets/style';
import LoginScreen from "../features/auth/screens/LoginScreen";
import SignupScreen from "../features/auth/screens/SignupScreen";


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName={"Login"}>
            <Stack.Screen name="Login" component={LoginScreen} options={authHeaderStyle} />
            <Stack.Screen name="Signup" component={SignupScreen} options={authHeaderStyle} />
        </Stack.Navigator>
    )
}

export default AuthStack