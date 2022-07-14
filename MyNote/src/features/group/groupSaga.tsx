import firestore from '@react-native-firebase/firestore';
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, take } from "redux-saga/effects";
import { groupAction, GroupPayload } from "./groupSlice";

function* watchAddGroup() {
    while (true) {
        const action: PayloadAction<GroupPayload> = yield take(groupAction.addGroup.type);
        yield call(handleAddGroup, action.payload)
    }
}

function* handleAddGroup(payload: GroupPayload) {
    yield firestore().collection('Groups').add({
        name: payload.name,
        description: payload.description,
        count: payload.count,
        uid: payload.uid,
        timestamp: firestore.FieldValue.serverTimestamp(),
    }).then(() => {
        console.log("Added group")
    })
}



export default function* groupSaga() {
    yield fork(watchAddGroup);
}