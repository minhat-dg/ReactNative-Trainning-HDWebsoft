import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface NoteState {
    loading: boolean
}

export interface NotePayload {
    title: string,
    content: string,
    groupId: string
}

const initialState: NoteState = {
    loading: false
}

const noteSlice = createSlice({
    name: 'note',
    initialState: initialState,
    reducers: {
        addNote(state, action: PayloadAction<NotePayload>){
            state.loading = true;
        },
        addSuccess(state){
            state.loading = false;
        },
        addFailed(state){
            state.loading = false;
        },
    }
})

const noteReducer = noteSlice.reducer;
export default noteReducer;

export const noteAction = noteSlice.actions;

export const selectLoading = (state) => state.note.loading;