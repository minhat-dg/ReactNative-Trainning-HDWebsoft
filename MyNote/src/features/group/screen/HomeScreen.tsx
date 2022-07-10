import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { homeStyle } from "../../../assets/style";
import CustomFloatButton from "../../../components/CustomButton/CustomFloatButton";
import { Group } from "../../../models/group";
import { authActions } from "../../auth/authSlice";
import AddGroupModal from "../components/AddGroupModal";
import { deleteGroup, getFirstPageGroups, getMoreGroups, setNewLast } from "../groupApi";


const HomeScreen = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const [noteGroups, setNoteGroups] = useState<Group[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [lastGroup, setLastGroup] = useState<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>>();
    const limitItem = 10;

    const uid = useAppSelector(state => state.auth.currentUser?.uid)

    useEffect(() => {
        const sub = getFirstPageGroups(setNoteGroups, uid, limitItem, setLastGroup);
        return () => {
            sub()
        }
    }, []);

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


    const renderNoteGroup = ({ item }: { item: Group }) => {
        const handleGroupPress = () => {
            navigation.navigate("Group", {
                groupName: item.name,
                groupId: item.id,
                count: item.count
            });
        }

        return (
            <TouchableOpacity activeOpacity={100} style={homeStyle.itemContainer} onPress={handleGroupPress}>
                <Text style={homeStyle.itemTextName}>{item.name}</Text>
                <Text style={homeStyle.itemTextDescription}>{item.description}</Text>
                <Text style={homeStyle.itemNoteCount}>Include {item.count} {item.count > 1 ? "notes" : "note"}</Text>
            </TouchableOpacity>

        )
    }

    const handleDelete = (id: string) => {
        if (id === lastGroup?.id) {
            const newLatsId = noteGroups[noteGroups.length - 2].id;
            setNewLast(uid, newLatsId, setLastGroup);
        }
        setNoteGroups(groups => {
            groups.forEach(item => {
                if(item.id === id){
                    groups.splice(groups.indexOf(item),1);
                }
            })
            return groups;
        })
        deleteGroup(id);
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
                        handleDelete(id)
                    }
                }
            ])
    }

    const renderHiddenItem = ({ item }: { item: Group }) => {
        const handleDeleteItem = () => {
            console.log(item.name)
            createConfirmDialog(item.id);
        }

        return (
            <TouchableOpacity style={homeStyle.hiddenItemContainer} onPress={handleDeleteItem}>
                <FontAwesome name="trash" color={'#FFFFFF'} size={25} />
            </TouchableOpacity>
        )
    }

    const handleLoadMore = () => {
        if (lastGroup) {
            getMoreGroups(setNoteGroups, uid, limitItem, setLastGroup, lastGroup)
        }
    }

    return (
        <SafeAreaView style={homeStyle.root}>
            <SwipeListView onEndReached={handleLoadMore} data={noteGroups} renderItem={renderNoteGroup} renderHiddenItem={renderHiddenItem} rightOpenValue={-75} />
            <CustomFloatButton onPress={setModalVisible} />
            <AddGroupModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </SafeAreaView>
    )
}

export default HomeScreen;