import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import GroupScreen from "./GroupScreen";
import NoteScreen from "./NoteScreen";
import SignupScreen from "./SignupScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Group" component={GroupScreen} />
            <Stack.Screen name="Note" component={NoteScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    )
}


export default StackNavigator;