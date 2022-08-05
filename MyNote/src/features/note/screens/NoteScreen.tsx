import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useAppDispatch } from "app/hook";
import { noteStyle } from "assets/style";
import CustomButton from "components/CustomButton/CustomButton";
import CustomButtonBorder from "components/CustomButton/CustomButtonBorder";
import CustomInput from "components/CustomInput/CustomInput";
import CustomInputLarge from "components/CustomInput/CustomInputLarge";
import KeyboardAvoidingWrapper from "components/KeyboardAvoiding/KeyboardAvoidingWrapper";
import RootStackParamList from "constants/type";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker/lib/typescript/types';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as yup from 'yup';
import LockNoteModal from "../components/LockNoteModal";
import UnlockModal from "../components/UnlockModal";
import VoiceModal from "../components/VoiceModal";
import { uploadImage } from "../notesApi";
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
        image: (note !== undefined ? note.image : ''),
        password: (note !== undefined ? note.password : ''),
    }
    const [lock, setLock] = useState(noteInfo.lock)
    const [password, setPassword] = useState(noteInfo.password)
    const [modalVisible, setModalVisible] = useState(false)
    const [unlockVisible, setUnlockVisible] = useState(noteInfo.lock)
    const [imageUri, setImageUri] = useState<string | undefined>(noteInfo.image)
    const [voiceModal, setVoiceModal] = useState(false)

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

    const handleSaveNote = async ({ title, content }: { title: string, content: string }) => {
        let url = noteInfo.image;
        if (imageUri !== '' && imageUri !== undefined && imageUri !== noteInfo.image) {
            url = await uploadImage(title, imageUri)
        }
        if (note === undefined) {
            dispatch(noteAction.addNote({
                title: title,
                content: content,
                groupId: groupId,
                lock: lock,
                pin: noteInfo.pin,
                password: password,
                image: url
            }))
        } else {
            dispatch(noteAction.updateNote({
                title: title,
                content: content,
                id: note.id,
                lock: lock,
                pin: noteInfo.pin,
                password: password,
                image: url
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

    const selectImage = () => {
        Alert.alert(
            "Add image",
            "Pick image from?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Camera",
                    onPress: () => cameraPick()
                },
                { text: "Gallery", onPress: () => galleryPick() },
            ]
        );
    };

    const cameraPick = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
        };
        launchCamera(options, response => {
            console.log("Launch camera")
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const uri = response.assets !== undefined ? response.assets[0].uri : '';
                console.log(uri);
                setImageUri(uri);
            }
        });
    }

    const galleryPick = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
        };
        launchImageLibrary(options, response => {
            console.log("Launch camera")
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const uri = response.assets !== undefined ? response.assets[0].uri : '';
                console.log(uri);
                setImageUri(uri);
            }
        })
    }


    return (
        <SafeAreaView style={noteStyle.root} >
            <KeyboardAvoidingWrapper>
                <>
                    {unlockVisible
                        ? <UnlockModal modalVisible={unlockVisible} setModalVisible={setUnlockVisible} handleCancel={handelCancel} password={note?.password} />
                        :
                        <Formik initialValues={noteInfo}
                            validationSchema={noteValidationSchema}
                            onSubmit={value => { handleSaveNote(value) }}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, }) => {
                                return (
                                    <>
                                        <VoiceModal modalVisible={voiceModal} setModalVisible={setVoiceModal} />
                                        <Text style={noteStyle.header}>Image:</Text>
                                        <TouchableOpacity style={noteStyle.imageContainer} onPress={selectImage}>
                                            {
                                                imageUri === '' ?
                                                    <FontAwesome name="camera" color={'#DFF6FF'} size={70} style={noteStyle.icon} />
                                                    : <Image style={noteStyle.image} source={{
                                                        uri: imageUri,
                                                    }} />
                                            }
                                        </TouchableOpacity>
                                        <Text style={noteStyle.header}>Title:</Text>
                                        <CustomInput placeHolder="Note title" value={values.title} onChangeText={handleChange('title')} onBlur={handleBlur('tile')} secureText={false} keyboardType='default' />
                                        {errors.title &&
                                            <Text style={noteStyle.error}>{errors.title}</Text>
                                        }
                                        <View style={noteStyle.contentCtn}>
                                            <Text style={noteStyle.header}>Content:</Text>
                                            <Text style={noteStyle.text}>Tap to speak</Text>
                                            <TouchableOpacity onPress={() => setVoiceModal(true)}>
                                                <FontAwesome name="microphone" color={'#DFF6FF'} size={22} />
                                            </TouchableOpacity>
                                        </View>

                                        <CustomInputLarge placeHolder="Note content" value={values.content} onChangeText={handleChange('content')} onBlur={handleBlur('content')} secureText={false} keyboardType='default' />
                                        <CustomButton text="Save" onPress={handleSubmit} isValid={isValid} />
                                        <CustomButtonBorder text="Cancel" onPress={handelCancel} />
                                    </>
                                )
                            }}
                        </Formik>
                    }
                    {modalVisible ? <LockNoteModal modalVisible={modalVisible} setModalVisible={setModalVisible} note={note} lock={lock} setLock={setLock} setPassword={setPassword} /> : <></>}
                </>
            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    )
}

export default NoteScreen;