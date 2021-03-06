import { groupModalStyle } from "assets/style";
import CustomInput from "components/CustomInput/CustomInput";
import { Formik } from "formik";
import { Note } from "models/note";
import React from "react";
import { Modal, Pressable, Text, ToastAndroid, View } from "react-native";
import * as yup from 'yup';

const LockNoteModal = ({ modalVisible, setModalVisible, note, lock, setLock, setPassword }: { modalVisible: boolean, setModalVisible: React.Dispatch<React.SetStateAction<boolean>>, note: Note | undefined, lock: boolean, setLock: React.Dispatch<React.SetStateAction<boolean>>, setPassword: React.Dispatch<React.SetStateAction<string>> }) => {

    const initialValues = {
        password: ''
    }

    const validationSchema = yup.object().shape({
        password: yup.string().required('Password is required')
    })

    const handleCancel = () => {
        setModalVisible(!modalVisible)
    }

    const handleLock = (password: string) => {
        setPassword(password)
        setLock(!lock)
        setModalVisible(!modalVisible)
        ToastAndroid.showWithGravity(
            "Locked",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    return (
        <View style={groupModalStyle.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={groupModalStyle.centeredView}>
                    <View style={groupModalStyle.modalView}>
                        <Text style={groupModalStyle.textModal}>Lock {note === undefined ? 'this note' : note.title}?</Text>
                        <Formik initialValues={initialValues}
                            onSubmit={value => { handleLock(value.password) }}
                            validationSchema={validationSchema}>
                            {({ handleChange, handleBlur, handleSubmit, errors, values, isValid, }) => (
                                <>
                                    <CustomInput placeHolder="Set password" value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} secureText={true} keyboardType='default' />
                                    {errors.password &&
                                        <Text style={groupModalStyle.error}>{errors.password}</Text>
                                    }
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Pressable
                                            style={groupModalStyle.buttonCancel}
                                            onPress={handleCancel}
                                        >
                                            <Text style={groupModalStyle.textButton}>Cancel</Text>
                                        </Pressable>
                                        <Pressable
                                            style={groupModalStyle.buttonAdd}
                                            onPress={handleSubmit}
                                            disabled={!isValid}
                                        >
                                            <Text style={groupModalStyle.textButton}>Lock</Text>
                                        </Pressable>
                                    </View>
                                </>
                            )}
                        </Formik>

                    </View>
                </View>
            </Modal>
        </View>
    )
}


export default LockNoteModal;