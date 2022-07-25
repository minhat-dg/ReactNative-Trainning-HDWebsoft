import React from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native";

const KeyboardAvoidingWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={{ height: '100%' }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper;