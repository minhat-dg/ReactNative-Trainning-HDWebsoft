import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import { mainHeaderStyle } from '../assets/style';
import HomeScreen from "../features/group/screen/HomeScreen";
import GroupScreen from "../features/note/screens/GroupScreen";
import NoteScreen from '../features/note/screens/NoteScreen';


const screens = {
    Home: {
        screen: HomeScreen,
        navigationOptions: mainHeaderStyle('All groups')
    },
    Group: {
        screen: GroupScreen,
        navigationOptions: mainHeaderStyle('All notes')
    },
    Note: {
        screen: NoteScreen,
        navigationOptions: mainHeaderStyle('Note')
    }
}

const Stack = createNativeStackNavigator();


const MainStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName={"Home"}>
            <Stack.Screen name="Home" component={HomeScreen} options={screens.Home.navigationOptions} />
            <Stack.Screen name="Group" component={GroupScreen} options={screens.Group.navigationOptions} />
            <Stack.Screen name="Note" component={NoteScreen} options={screens.Note.navigationOptions} />
        </Stack.Navigator>
    )
}

export default MainStack
