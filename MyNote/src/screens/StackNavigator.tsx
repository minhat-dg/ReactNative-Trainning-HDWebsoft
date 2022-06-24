import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import GroupScreen from "./GroupScreen";
import NoteScreen from "./NoteScreen";
import SignupScreen from "./SignupScreen";
import auth from "@react-native-firebase/auth";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={!user ? "Login" : "Home"}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Group" component={GroupScreen} />
            <Stack.Screen name="Note" component={NoteScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    )
}


export default StackNavigator;