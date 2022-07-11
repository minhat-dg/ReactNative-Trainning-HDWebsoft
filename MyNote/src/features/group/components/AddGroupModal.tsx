import { useAppDispatch, useAppSelector } from "app/hook";
import { groupModalStyle } from "assets/style";
import CustomInput from "components/CustomInput/CustomInput";
import { Formik } from "formik";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import * as yup from 'yup';
import { groupAction } from "../groupSlice";

const AddGroupModal = ({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const dispatch = useAppDispatch()
    const uid = useAppSelector(state => state.auth.currentUser?.uid)

    const groupInfo = {
        groupName: '',
        groupDesc: ''
    }

    const groupValidationSchema = yup.object().shape({
        groupName: yup.string().required('Group name is required')
    })

    const handleAdd = ({ groupName, groupDesc }: { groupName: string, groupDesc: string }) => {
        setModalVisible(!modalVisible)
        dispatch(groupAction.addGroup({
            name: groupName,
            description: groupDesc,
            count: 0,
            uid: uid
        }))
    }

    const handleCancel = () => {
        setModalVisible(!modalVisible)
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
                        <Text style={groupModalStyle.textModal}>Add group</Text>
                        <Formik initialValues={groupInfo}
                            validationSchema={groupValidationSchema}
                            onSubmit={value => { handleAdd(value) }}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, }) => (
                                <>
                                    <CustomInput placeHolder="Group name" value={values.groupName} onChangeText={handleChange('groupName')} onBlur={handleBlur('groupName')} secureText={false} keyboardType='default' />
                                    {errors.groupName &&
                                        <Text style={groupModalStyle.error}>{errors.groupName}</Text>
                                    }
                                    <CustomInput placeHolder="Group description" value={values.groupDesc} onChangeText={handleChange('groupDesc')} onBlur={handleBlur('groupDesc')} secureText={false} keyboardType='default' />
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
                                            <Text style={groupModalStyle.textButton}>Add</Text>
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


export default AddGroupModal;