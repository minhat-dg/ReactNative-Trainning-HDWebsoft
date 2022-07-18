import { HeaderSearchBarStyle } from "assets/style";
import React from "react";
import { TextInput, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const HeaderSearchBar = ({ value, onChangeText, onSearchFocus }: { value: string, onChangeText: (value: string) => void, onSearchFocus: () => void }) => {
    return (
        <View style={HeaderSearchBarStyle.container}>
            <TextInput placeholder="Seach..." placeholderTextColor='#DFF6FF' style={HeaderSearchBarStyle.input} value={value} onChangeText={(text) => { onChangeText(text) }}
                onFocus={onSearchFocus} clearTextOnFocus={true} />
            <FontAwesome name="search" color={'#DFF6FF'} size={20} />
        </View>
    )
}

export default HeaderSearchBar;