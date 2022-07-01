import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Circle } from "react-native-progress";

const ProgressBar = () => {
    return (
        <View style={styles.progressBar} >
                    <Circle size={30} indeterminate={true} />
                    <Text style={styles.textProgressBar}>Loading</Text>
                </View>
    )
}

export default ProgressBar;

const styles = StyleSheet.create({
    progressBar: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#06283D',
        padding: 10,
        width: '100%',
        height: '100%'
    },
    textProgressBar: {
        color: '#DFF6FF',
        fontWeight: 'normal',
        fontSize: 16,
    },
})