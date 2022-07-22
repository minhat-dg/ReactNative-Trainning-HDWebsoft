import { NativeStackNavigationOptions } from "@react-navigation/native-stack"
import { Dimensions, StyleSheet } from "react-native"

const screenWidth = Dimensions.get('screen').width

export const mainHeaderStyle: NativeStackNavigationOptions = {
    headerStyle: {
        backgroundColor: '#06283D',
    },
    headerTintColor: "#DFF6FF",
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20
    },
}

export const HeaderSearchBarStyle = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#1363DF",
        borderRadius: 10,
        marginBottom: 10
    },
    input: {
        flex: 11,
        marginTop: 10,
        color: "#DFF6FF"
    }
})

export const authHeaderStyle = {
    headerStyle: { backgroundColor: '#06283D' },
    title: '',
    headerTintColor: "#DFF6FF"
}

export const customButtonStyle = StyleSheet.create({
    container: {
        backgroundColor: '#1363DF',
        width: '100%',
        marginVertical: 10,
        padding: 15,

        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#DFF6FF'
    }
})

export const customButtonBorderStyle = StyleSheet.create({
    container: {
        borderColor: '#1363DF',
        borderWidth: 1,
        width: '100%',
        marginVertical: 0,
        padding: 15,
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#DFF6FF'
    }
})

export const floatButtonStyle = StyleSheet.create({
    floatButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        position: 'absolute',
        bottom: 15,
        right: 15,
        height: 60,
        backgroundColor: '#DFF6FF',
        borderRadius: 100,
    }
})

export const inputStyle = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
        borderColor: '#1363DF',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        color: "#DFF6FF"
    }
})

export const inputLargeStyle = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 5,
        borderColor: '#1363DF',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        flex: 1,
        alignItems: 'flex-start'
    },
    input: {
        color: "#DFF6FF",
        flex: 1,
        textAlign: 'left',
        textAlignVertical: 'top',
        width: '100%',
        height: '100%',
    }
})

export const progressBarStyle = StyleSheet.create({
    progressBar: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#06283D',
        width: '100%',
        height: '100%'
    },
    textProgressBar: {
        color: '#DFF6FF',
        fontWeight: 'normal',
        fontSize: 16,
    },
})

export const loginStyle = StyleSheet.create({
    header: {
        fontSize: 30,
        marginTop: 100,
        color: '#DFF6FF',
        marginBottom: 30
    },
    root: {
        alignItems: 'center',
        backgroundColor: '#06283D',
        height: '100%',
        paddingHorizontal: 20
    },
    caption: {
        color: '#DFF6FF',
        fontWeight: 'normal',
        fontSize: 16,
        marginBottom: 20
    },
    textContainer: {
        textAlignVertical: 'bottom',
        flex: 1,
        marginBottom: 20
    },
    signup: {
        color: '#1363DF',
        fontWeight: 'bold',
        fontSize: 16
    },
    iconContainer: {
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'space-between'
    },
    error: {
        fontSize: 12,
        color: 'red'
    }
})

export const signupStyle = StyleSheet.create({
    header: {
        fontSize: 30,
        marginTop: 100,
        color: '#DFF6FF',
        marginBottom: 30,
    },
    root: {
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#06283D',
        height: '100%',
        justifyContent: 'center'
    },
    caption: {
        color: '#DFF6FF',
        fontWeight: 'normal',
        fontSize: 16,
    },
    textContainer: {
        textAlignVertical: 'bottom',
        flex: 1,
        marginBottom: 20
    },
    signup: {
        color: '#1363DF',
        fontWeight: 'bold',
        fontSize: 16,

    },
    error: {
        fontSize: 12,
        color: 'red'
    }
})

export const groupModalStyle = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        marginTop: '40%'
    },
    modalView: {
        margin: 20,
        backgroundColor: "#06283D",
        borderRadius: 20,
        borderColor: '#000000',
        borderWidth: 1,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    },
    textModal: {
        marginBottom: 10,
        textAlign: "center",
        color: 'white',
        fontSize: 20
    },
    buttonAdd: {
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        backgroundColor: '#47B5FF',
        width: '30%',
        marginHorizontal: 5,
    },
    buttonCancel: {
        borderRadius: 10,
        borderColor: '#47B5FF',
        borderWidth: 1,
        backgroundColor: '#06283D',
        padding: 5,
        elevation: 2,
        width: '30%',
        marginHorizontal: 5,
    },
    error: {
        fontSize: 12,
        color: 'red'
    }
});

export const homeStyle = StyleSheet.create({
    root: {
        padding: 20,
        backgroundColor: '#06283D',
        height: '100%',
    },
    header: {
        fontWeight: '500',
        fontSize: 25,
        color: '#DFF6FF',
        marginBottom: 20
    },
    itemContainer: {
        backgroundColor: '#47B5FF',
        borderRadius: 10,
        flex: 1,
        height: 100,
        margin: 10,
        padding: 10
    },
    itemTextName: {
        color: '#DFF6FF',
        fontSize: 20,
        fontWeight: '500',
    },
    itemTextDescription: {
        color: '#06283D',
        fontSize: 16,
        fontWeight: 'normal',
        marginTop: 5
    },
    itemNoteCount: {
        color: '#DFF6FF',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5
    },
    hiddenItemContainer: {
        alignItems: 'flex-end',
        height: 100,
        margin: 10,
        padding: 25,
        borderRadius: 10,
        backgroundColor: '#FF0000',
        justifyContent: 'center'
    },
})

export const groupMenuStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    container: {
        alignItems: "center",
        backgroundColor: "#06283D",
        borderColor: '#000000',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        maxHeight: '50%'
    },
    textModal: {
        textAlign: "center",
        color: 'white',
        fontSize: 15,
    },
    scrollView: {
        width: '100%'
    },
    itemContainer: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 10
    }
});

export const noteItemStyle = (numColumn: number) => StyleSheet.create({
    itemContainer: {
        width: screenWidth / numColumn - 10,
        alignItems: 'center',
        padding: 10
    },
    itemCard: {
        backgroundColor: '#47B5FF',
        borderRadius: 10,
        height: 150,
        width: '100%',
        alignItems: 'center',
        padding: 5,
        flexDirection: 'column'
    },
    itemTextName: {
        color: '#DFF6FF',
        fontSize: 20,
        fontWeight: '500',
        flexWrap: 'wrap'
    },
    itemTextDescription: {
        flex: 8,
        color: '#06283D',
        fontSize: 16,
        fontWeight: 'normal',
        marginTop: 5,
        flexShrink: 1,
    },
    iconLarge: {
        flex: 9,
        color: '#06283D',
        marginTop: 10,
        textAlignVertical: 'center'
    },
    iconContainer: {
        flex: 4,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    iconSmall: {
        flex: 3,
        textAlign: 'right',
        alignItems: 'flex-end'
    },
    timestamp: {
        flex: 9,
        fontSize: 15,
    }
})

export const noteItemListStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        padding: 10,
        marginHorizontal: 5,
    },
    mainContainer: {
        flexDirection: 'column',
        flex: 8
    },
    title: {
        color: '#47B5FF',
        fontSize: 24,
        flex: 8
    },
    timestamp: {
        fontSize: 15,
        color: '#DFF6FF'
    },
    iconTouch: {
        flex: 1.5,
    },
    icon: {
        flex: 1,
        textAlign: 'right',
        textAlignVertical: 'center'
    }
})

export const noteOptionStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#06283D",
        borderColor: '#000000',
        borderWidth: 1,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    container: {
        width: '100%',
        borderBottomWidth: 1,
        padding: 10
    },
    textModal: {
        textAlign: "center",
        color: '#DFF6FF',
        fontSize: 15,
    },
});

export const groupStyle = StyleSheet.create({
    root: {
        padding: 10,
        backgroundColor: '#06283D',
        height: '100%',
    },
    header: {
        fontWeight: '500',
        fontSize: 20,
        color: '#DFF6FF',
        marginStart: 10,
        marginBottom: 5,
    },
    itemContainer: {
        flex: 0.5,
        alignItems: 'center',
        padding: 10
    },
    itemCard: {
        backgroundColor: '#47B5FF',
        borderRadius: 10,
        height: 150,
        width: '100%',
        alignItems: 'center',
        padding: 5
    },
    itemTextName: {
        color: '#DFF6FF',
        fontSize: 20,
        fontWeight: '500',
    },
    itemTextDescription: {
        color: '#06283D',
        fontSize: 16,
        fontWeight: 'normal',
        marginTop: 5,
        flexShrink: 1
    },
    pinContainer: {
        maxHeight: '35%',
        borderBottomWidth: 1,
        borderColor: '#47B5FF'
    },
})

export const noteStyle = StyleSheet.create({
    root: {
        padding: 20,
        backgroundColor: '#06283D',
        height: '100%',
    },
    header: {
        color: "#DFF6FF",
        fontSize: 20,
        fontWeight: '600'
    },
    error: {
        fontSize: 12,
        color: 'red'
    }
})