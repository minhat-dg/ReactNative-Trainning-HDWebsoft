import firestore from '@react-native-firebase/firestore';
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, take } from "redux-saga/effects";
import { AddNotePayload, noteAction, UpdateNotePayload } from "./noteSlice";

const increasement = firestore.FieldValue.increment(1);

function* watchAddNote() {
    while (true) {
        const action: PayloadAction<AddNotePayload> = yield take(noteAction.addNote.type);
        yield call(handleAddNote, action.payload)
    }
}

function* handleAddNote(payload: AddNotePayload) {
    yield firestore().collection('Notes').add({
        title: payload.title,
        content: payload.content,
        groupId: payload.groupId,
        timestamp: firestore.Timestamp.now(),
        lock: payload.lock,
        pin: payload.pin,
        password: payload.password
    }).then(() => {
        firestore().collection('Groups').doc(payload.groupId).update({
            count: increasement
        })
        console.log("Added Note")
    })
}

function* watchUpdateNote() {
    while (true) {
        const action: PayloadAction<UpdateNotePayload> = yield take(noteAction.updateNote.type);
        yield call(handleUpdateNote, action.payload)
    }
}

function* handleUpdateNote(payload: UpdateNotePayload) {
    yield firestore().collection('Notes').doc(payload.id).update({
        title: payload.title,
        content: payload.content,
        timestamp: firestore.Timestamp.now(),
        lock: payload.lock,
        pin: payload.pin,
        password: payload.password
    })
}

export default function* noteSaga() {
    yield fork(watchAddNote);
    yield fork(watchUpdateNote);
}