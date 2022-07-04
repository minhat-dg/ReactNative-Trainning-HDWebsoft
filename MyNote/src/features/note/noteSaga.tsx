import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, take } from "redux-saga/effects";
import { noteAction, NotePayload } from "./noteSlice";
import firestore from '@react-native-firebase/firestore';


function* watchAddNote(){
    while(true){
        const action: PayloadAction<NotePayload> = yield take(noteAction.addNote.type);
        yield call(handleAddNote, action.payload)
    }
}

function* handleAddNote(payload: NotePayload){
    console.log(payload.title, " ", payload.content, " ", payload.groupId)
    firestore().collection('Notes').add({
        title: payload.title,
        content: payload.content,
        groupId: payload.groupId
    }).then(() => {
        console.log("Added Note")
    })
}

export default function* noteSaga() {
    yield fork(watchAddNote);
}