import { Formik } from "formik";
import React from "react";
import { Alert, SafeAreaView, Text } from "react-native";
import * as yup from 'yup';
import { useAppDispatch } from "../../../app/hook";
import { noteStyle } from "../../../assets/style";
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

    const handleSaveNote = ({ title, content }: { title: string, content: string }) => {
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
        <SafeAreaView style={noteStyle.root}>
            <Formik initialValues={noteInfo}
                validationSchema={noteValidationSchema}
                onSubmit={value => { handleSaveNote(value) }}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, }) => (
                    <>
                        <Text style={noteStyle.header}>Title:</Text>
                        <CustomInput placeHolder="Note title" value={values.title} onChangeText={handleChange('title')} onBlur={handleBlur('tile')} secureText={false} keyboardType='default' />
                        {errors.title &&
                            <Text style={noteStyle.error}>{errors.title}</Text>
                        }
                        <Text style={noteStyle.header}>Content:</Text>
                        <CustomInputLarge placeHolder="Note content" value={values.content} onChangeText={handleChange('content')} onBlur={handleBlur('content')} secureText={false} keyboardType='default' />
                        <CustomButton text="Save" onPress={handleSubmit} isValid={isValid} />
                        <CustomButtonBorder text="Cancel" onPress={handelCancel} />
                    </>
                )}
            </Formik>

        </SafeAreaView>
    )
}

export default NoteScreen;