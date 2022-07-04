import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text } from "react-native";
import { useAppDispatch } from "../../../app/hook";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomButtonBorder from "../../../components/CustomButton/CustomButtonBorder";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomInputLarge from "../../../components/CustomInput/CustomInputLarge";
import { noteAction } from "../noteSlice";

const NoteScreen = ({route, navigation }) => {
    const {groupId, note} = route.params;
    const [title, setTitle] = useState(note !== undefined ? note.name : '')
    const [content, setContent] = useState(note !== undefined ? note.description : '')

    const dispatch = useAppDispatch();

    const handleSaveNote = () => {
        dispatch(noteAction.addNote({
            title: title,
            content: content,
            groupId: groupId
        }))
        navigation.goBack();
    }

    const handelCancel = () => {
        Alert.alert(
            "Are you sure to cancel?",
            "All changes will not be saved",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                    },
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        navigation.navigate("Group")
                    }
                }
            ])
    }

return (
    <SafeAreaView style={styles.root}>
        <Text style={styles.header}>Title:</Text>
        <CustomInput placeHolder="Note title" value={title} setValue={setTitle} secureText={false} />
        <Text style={styles.header}>Content:</Text>
        <CustomInputLarge placeHolder="Note content" value={content} setValue={setContent} secureText={false} />
        <CustomButton text="Save" onPress={handleSaveNote} />
        <CustomButtonBorder text="Cancel" onPress={handelCancel} />
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    root: {
        padding: 20,
        backgroundColor: '#06283D',
        height: '100%',
    },
    header: {
        color: "#DFF6FF",
        fontSize: 20,
        fontWeight: '600'
    }
})

export default NoteScreen;