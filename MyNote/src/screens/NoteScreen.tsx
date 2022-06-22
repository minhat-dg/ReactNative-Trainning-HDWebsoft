import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomButtonBorder from "../components/CustomButtonBorder";
import CustomInput from "../components/CustomInput";
import CustomInputLarge from "../components/CustomInputLarge";

const NoteScreen = ({ navigation, route }) => {
    const note = route.params.note
    const [title, setTitle] = useState(note !== undefined ? note.name : '')
    const [content, setContent] = useState(note !== undefined ? note.description : '')

    const handleSaveNote = () => {
        navigation.navigate("Group")
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