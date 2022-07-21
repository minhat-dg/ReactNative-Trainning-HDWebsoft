import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { noteStyle } from "assets/style";
import CustomButton from "components/CustomButton/CustomButton";
import CustomButtonBorder from "components/CustomButton/CustomButtonBorder";
import CustomInput from "components/CustomInput/CustomInput";
import CustomInputLarge from "components/CustomInput/CustomInputLarge";
import RootStackParamList from "constants/type";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as yup from 'yup';
import { useAppDispatch } from "../../../app/hook";
import LockNoteModal from "../components/LockNoteModal";
import UnlockModal from "../components/UnlockModal";
import { noteAction } from "../noteSlice";

type NoteGroupScreenProps = NativeStackScreenProps<RootStackParamList, 'Note'>
const NoteScreen = ({ route, navigation }: { navigation: NoteGroupScreenProps['navigation'], route: NoteGroupScreenProps['route'] }) => {
    const { groupId, note } = route.params;

    const dispatch = useAppDispatch();
    const noteInfo = {
        title: (note !== undefined ? note.title : ''),
        content: (note !== undefined ? note.content : ''),
        lock: (note !== undefined ? note.lock : false),
        pin: (note !== undefined ? note.pin : false),
    }
    const [lock, setLock] = useState(noteInfo.lock)
    const [modalVisible, setModalVisible] = useState(false)
    const [unlockVisible, setUnlockVisible] = useState(noteInfo.lock)

    useEffect(() => {
        navigation.setOptions({
            headerBackVisible: false,
            headerTitle: noteInfo.title === '' ? 'New Note' : noteInfo.title,
            headerRight() {
                return (
                    <TouchableOpacity onPress={() => handleLock()}>
                        {!lock
                            ? <FontAwesome name="unlock" color={'#DFF6FF'} size={25} />
                            : <FontAwesome name="lock" color={'#DFF6FF'} size={25} />
                        }
                    </TouchableOpacity>
                )
            },
        });
    }, [lock])

    const handleLock = () => {
        if (!lock) {
            setModalVisible(true)
        } else {
            setLock(!lock)
        }
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
                lock: lock,
                pin: noteInfo.pin
            }))
        } else {
            dispatch(noteAction.updateNote({
                title: title,
                content: content,
                id: note.id,
                lock: lock,
                pin: noteInfo.pin
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
            {unlockVisible
                ? <UnlockModal modalVisible={unlockVisible} setModalVisible={setUnlockVisible} handleCancel={handelCancel} />
                : <Formik initialValues={noteInfo}
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
            }
            {modalVisible ? <LockNoteModal modalVisible={modalVisible} setModalVisible={setModalVisible} note={note} lock={lock} setLock={setLock} /> : <></>}
        </SafeAreaView>
    )
}

export default NoteScreen;