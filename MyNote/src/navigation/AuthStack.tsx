import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import LoginScreen from "../features/auth/screens/LoginScreen";
import SignupScreen from "../features/auth/screens/SignupScreen";


const authHeaderStyle = {
    headerStyle: { backgroundColor: '#06283D' },
    title: '',
    headerTintColor: "#DFF6FF"
}

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName={"Login"}>
            <Stack.Screen name="Login" component={LoginScreen} options={authHeaderStyle}/>
            <Stack.Screen name="Signup" component={SignupScreen} options={authHeaderStyle}/>
        </Stack.Navigator>
    )
}

export default AuthStack