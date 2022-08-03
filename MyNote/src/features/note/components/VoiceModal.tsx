import Voice, { SpeechResultsEvent, SpeechStartEvent } from "@react-native-community/voice";
import { voiceModalStyle } from "assets/style";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface NoteField {
    title: string,
    content: string,
}

const VoiceModal = ({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [started, setStarted] = useState(false);
    const [partialResults, setPartialResults] = useState<string | undefined>('');
    const [result, setResult] = useState<string | undefined>('');
    const form = useFormikContext<NoteField>();
    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        setPartialResults('Tap play to start listening')
        return () => {
            Voice.destroy().then(Voice.removeAllListeners)
        }
    }, [])



    const onSpeechStart = (e: SpeechStartEvent) => {
        console.log("Start: ", e)
    };

    const onSpeechResults = (e: SpeechResultsEvent) => {
        console.log("Result: ", e.value)
        setResult(e.value?.[0])
    };

    const onSpeechPartialResults = (e: SpeechResultsEvent) => {
        console.log("PartialResults: ", e.value)
        setPartialResults(e.value?.[0])
    };

    const startSpeechRecognizing = async () => {
        console.log("Start recording")
        setPartialResults("Listening...")
        setStarted(true)
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error("Error: ", e);
        }
    };

    const stopSpeechRecognizing = async () => {
        console.log('Stop recording')
        const oldValue = form.values.content;
        const newValue = oldValue + " " + result
        form.setFieldValue('content', newValue)
        try {
            handleCloseModal();
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };

    const handleCloseModal = () => {
        setPartialResults('Tap play to start listening');
        setStarted(false)
        setModalVisible(false)
    }

    return (
        <View style={voiceModalStyle.centeredView}>
            <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPressOut={handleCloseModal}>
                    <View style={voiceModalStyle.centeredView}>
                        <View style={voiceModalStyle.modalView}>
                            <Text style={voiceModalStyle.textModal}>{partialResults}</Text>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                {!started
                                    ? <TouchableOpacity style={voiceModalStyle.buttonContainer} onPress={startSpeechRecognizing}>
                                        <FontAwesome name="play" color={'#DFF6FF'} size={22} />
                                        <Text style={voiceModalStyle.textButton}>Start</Text>
                                    </TouchableOpacity>
                                    : <TouchableOpacity style={voiceModalStyle.buttonContainer} onPress={stopSpeechRecognizing}>
                                        <FontAwesome name="stop" color={'#DFF6FF'} size={22} />
                                        <Text style={voiceModalStyle.textButton}>Stop</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default VoiceModal