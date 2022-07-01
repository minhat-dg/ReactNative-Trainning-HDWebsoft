import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, take } from "redux-saga/effects";
import { groupAction, GroupPayload } from "./groupSlice";
import firestore from '@react-native-firebase/firestore'
import { useAppSelector } from "../../app/hook";
import auth from "@react-native-firebase/auth";

function* watchAddGroup(){
    while(true){
        const action:PayloadAction<GroupPayload> = yield take(groupAction.addGroup.type);
        yield call(handleAddGroup, action.payload)
    }
}

function* handleAddGroup(payload: GroupPayload){
    firestore().collection('Groups').add ({
        name: payload.name,
        description: payload.description,
        count: payload.count,
        uid: payload.uid
    }).then(() => {
        console.log("ADDED")
    })

}

export default function* groupSaga() {
    yield fork(watchAddGroup);
}