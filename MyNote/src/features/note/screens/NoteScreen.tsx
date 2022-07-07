import { Formik } from "formik";
import React from "react";
import { Alert, SafeAreaView, StyleSheet, Text } from "react-native";
import * as yup from 'yup';
import { useAppDispatch } from "../../../app/hook";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomButtonBorder from "../../../components/CustomButton/CustomButtonBorder";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomInputLarge from "../../../components/CustomInput/CustomInputLarge";
import { noteAction } from "../noteSlice";

const NoteScreen = ({ route, navigation }) => {
    const { groupId, note } = route.params;
    const dispatch = useAppDispatch();

    const noteInfo = {
        title: (note !== undefined ? note.title : ''),
        content: (note !== undefined ? note.content : '')
    }

    const noteValidationSchema = yup.object().shape({
        title: yup.string().required('Note title is required')
    })

    const handleSaveNote = ({ title, content }) => {
        if (note === undefined) {
            dispatch(noteAction.addNote({
                title: title,
                content: content,
                groupId: groupId,
            }))
        } else {
            dispatch(noteAction.updateNote({
                title: title,
                content: content,
                id: note.id
            }))
        }
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
                        navigation.goBack()
                    }
                }
            ])
    }

    return (
        <SafeAreaView style={styles.root}>
            <Formik initialValues={noteInfo}
                validationSchema={noteValidationSchema}
                onSubmit={value => { handleSaveNote(value) }}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, }) => (
                    <>
                        <Text style={styles.header}>Title:</Text>
                        <CustomInput placeHolder="Note title" value={values.title} onChangeText={handleChange('title')} onBlur={handleBlur('tile')} secureText={false} keyboardType='default' />
                        {errors.title &&
                            <Text style={styles.error}>{errors.title}</Text>
                        }
                        <Text style={styles.header}>Content:</Text>
                        <CustomInputLarge placeHolder="Note content" value={values.content} onChangeText={handleChange('content')} onBlur={handleBlur('content')} secureText={false} keyboardType='default' />
                        <CustomButton text="Save" onPress={handleSubmit} isValid={isValid} />
                        <CustomButtonBorder text="Cancel" onPress={handelCancel} />
                    </>
                )}
            </Formik>

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
    },
    error: {
        fontSize: 12,
        color: 'red'
    }
})

export default NoteScreen;