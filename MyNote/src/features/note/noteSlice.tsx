import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface NoteState {
    loading: boolean
}

export interface AddNotePayload {
    title: string,
    content: string,
    groupId: string,
    lock: boolean,
    pin: boolean,
    password: string,
    image: string,
}

export interface UpdateNotePayload {
    title: string,
    content: string,
    id: string,
    lock: boolean,
    pin: boolean,
    password: string,
    image: string
}

const initialState: NoteState = {
    loading: false
}

const noteSlice = createSlice({
    name: 'note',
    initialState: initialState,
    reducers: {
        addNote(state, action: PayloadAction<AddNotePayload>) {
            state.loading = true;
            action;
        },
        addSuccess(state) {
            state.loading = false;
        },
        addFailed(state) {
            state.loading = false;
        },
        updateNote(state, action: PayloadAction<UpdateNotePayload>) {
            state.loading = true;
            action;
        }
    }
})

const noteReducer = noteSlice.reducer;
export default noteReducer;

export const noteAction = noteSlice.actions;

export const selectLoading = (state: { note: { loading: boolean; }; }) => state.note.loading;