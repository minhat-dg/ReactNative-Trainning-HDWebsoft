import React from "react";
import { Text, View } from "react-native";
import { Circle } from "react-native-progress";
import { progressBarStyle } from "../../assets/style";

const ProgressBar = () => {
    return (
        <View style={progressBarStyle.progressBar} >
            <Circle size={30} indeterminate={true} />
            <Text style={progressBarStyle.textProgressBar}>Loading</Text>
        </View>
    )
}

export default ProgressBar;
