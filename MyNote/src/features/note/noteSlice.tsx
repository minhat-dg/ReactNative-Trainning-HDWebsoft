import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface NoteState {
    loading: boolean
}

export interface AddNotePayload {
    title: string,
    content: string,
    groupId: string,
    count: number
}

export interface UpdateNotePayload {
    title: string,
    content: string,
    id: string,
}

const initialState: NoteState = {
    loading: false
}

const noteSlice = createSlice({
    name: 'note',
    initialState: initialState,
    reducers: {
        addNote(state, action: PayloadAction<AddNotePayload>){
            state.loading = true;
        },
        addSuccess(state){
            state.loading = false;
        },
        addFailed(state){
            state.loading = false;
        },
        updateNote(state, action: PayloadAction<UpdateNotePayload>){
            state.loading = true;
        }
    }
})

const noteReducer = noteSlice.reducer;
export default noteReducer;

export const noteAction = noteSlice.actions;

export const selectLoading = (state) => state.note.loading;