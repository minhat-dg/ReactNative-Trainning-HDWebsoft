import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, take } from "redux-saga/effects";
import { noteAction, AddNotePayload, UpdateNotePayload } from "./noteSlice";
import firestore from '@react-native-firebase/firestore';


function* watchAddNote(){
    while(true){
        const action: PayloadAction<AddNotePayload> = yield take(noteAction.addNote.type);
        yield call(handleAddNote, action.payload)
    }
}

function* handleAddNote(payload: AddNotePayload){
    firestore().collection('Notes').add({
        title: payload.title,
        content: payload.content,
        groupId: payload.groupId
    }).then(() => {
        firestore().collection('Groups').doc(payload.groupId).update({
            count: payload.count+1
        })
        console.log("Added Note")
    })
}

function* watchUpdateNote(){
    while(true){
        const action: PayloadAction<UpdateNotePayload> = yield take(noteAction.updateNote.type);
        yield call(handleUpdateNote, action.payload)
    }
}

function* handleUpdateNote(payload: UpdateNotePayload) {
    firestore().collection('Notes').doc(payload.id).update({
        title: payload.title,
        content: payload.content
    })
}

export default function* noteSaga() {
    yield fork(watchAddNote);
    yield fork(watchUpdateNote);
}