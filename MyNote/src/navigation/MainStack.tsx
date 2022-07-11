import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mainHeaderStyle } from 'assets/style';
import RootStackParamList from 'constants/type';
import React from "react";
import HomeScreen from "../features/group/screen/HomeScreen";
import GroupScreen from "../features/note/screens/GroupScreen";
import NoteScreen from '../features/note/screens/NoteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();


const MainStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName={"Home"}>
            <Stack.Screen name="Home" component={HomeScreen} options={mainHeaderStyle} />
            <Stack.Screen name="Group" component={GroupScreen} options={mainHeaderStyle} />
            <Stack.Screen name="Note" component={NoteScreen} options={mainHeaderStyle} />
        </Stack.Navigator>
    )
}

export default MainStack
