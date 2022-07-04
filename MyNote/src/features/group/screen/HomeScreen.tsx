import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import AddGroupModal from "../../../components/AddGroupModal";
import CustomFloatButton from "../../../components/CustomButton/CustomFloatButton";
import { authActions } from "../../auth/authSlice";

import { deleteGroup, getAllGroups } from "../groupApi";

const HomeScreen = ({ navigation }) => {
    const [noteGroups, setNoteGroups] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const uid = useAppSelector(state => state.auth.currentUser?.uid)

    useEffect(() => {
        getAllGroups(setNoteGroups, uid)
    }, []);

    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        console.log("LOGING OUT")
        dispatch(authActions.logOut())
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <FontAwesome name="sign-out" color={'#DFF6FF'} size={20} onPress={handleLogOut} />
            ),
        });
    }, [navigation]);


    const renderNoteGroup = ({ item }) => {
        const handleGroupPress = () => {
            navigation.navigate("Group", {
                groupName: item.name,
                groupId: item.id
            });
        }

        return (
            <TouchableOpacity activeOpacity={100} style={styles.itemContainer} onPress={handleGroupPress}>
                <Text style={styles.itemTextName}>{item.name}</Text>
                <Text style={styles.itemTextDescription}>{item.description}</Text>
                <Text style={styles.itemNoteCount}>Include {item.count} {item.count > 1 ? "notes" : "note"}</Text>
            </TouchableOpacity>

        )
    }

    const createConfirmDialog = (id: string) => {
        Alert.alert(
            "Delete group?",
            "Are you sure to delete this group?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        deleteGroup(id)
                    }
                }
            ])
    }

    const renderHiddenItem = ({ item }) => {
        const handleDeleteItem = () => {
            console.log(item.name)
            createConfirmDialog(item.id);
        }

        return (
            <TouchableOpacity style={styles.hiddenItemContainer} onPress={handleDeleteItem}>
                <FontAwesome name="trash" color={'#FFFFFF'} size={25} />
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={styles.root}>
            <SwipeListView data={noteGroups} renderItem={renderNoteGroup} renderHiddenItem={renderHiddenItem} rightOpenValue={-75} />
            <CustomFloatButton onPress={setModalVisible} />
            <AddGroupModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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

export default HomeScreen;