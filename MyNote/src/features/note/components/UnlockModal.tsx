import { groupModalStyle } from "assets/style";
import CustomInput from "components/CustomInput/CustomInput";
import { Formik } from "formik";
import React from "react";
import { Modal, Pressable, Text, ToastAndroid, View } from "react-native";
import * as yup from 'yup';
import { checkPassword } from "../notesApi";


const UnlockModal = ({ modalVisible, setModalVisible, handleCancel }: { modalVisible: boolean, setModalVisible: React.Dispatch<React.SetStateAction<boolean>>, handleCancel: () => void }) => {

    const initialValues = {
        password: ''
    }

    const validationSchema = yup.object().shape({
        password: yup.string().required('Password is required')
    })


    const handleValid = async (password: string) => {
        const respone = await checkPassword(password)
        if (respone === 'OK') {
            setModalVisible(!modalVisible)
            return;
        }
        if (respone === 'auth/wrong-password') {
            ToastAndroid.showWithGravity(
                "Password are incorrect",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return;
        }
        if (respone === 'auth/network-request-failed') {
            ToastAndroid.showWithGravity(
                "Please check the internet connection",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return;
        }
    }

    return (
        <View style={groupModalStyle.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={groupModalStyle.centeredView}>
                    <View style={groupModalStyle.modalView}>
                        <Text style={groupModalStyle.textModal}>Enter password to view note</Text>
                        <Formik initialValues={initialValues}
                            onSubmit={value => { handleValid(value.password) }}
                            validationSchema={validationSchema}>
                            {({ handleChange, handleBlur, handleSubmit, errors, values, isValid, }) => (
                                <>
                                    <CustomInput placeHolder="Password" value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} secureText={true} keyboardType='default' />
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
                                            <Text style={groupModalStyle.textButton}>Enter</Text>
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


export default UnlockModal;