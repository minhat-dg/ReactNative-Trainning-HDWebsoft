import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface GroupState{
    loading: boolean,
}


export interface GroupPayload {
    name: string,
    description: string,
    count: number,
    uid: string
}

const initialState: GroupState ={
    loading: false,
}

const groupSlice = createSlice({
    name: 'group',
    initialState: initialState,
    reducers: {
        addGroup(state, action: PayloadAction<GroupPayload>){
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

const groupReducer = groupSlice.reducer;
export default groupReducer;

export const groupAction = groupSlice.actions;

export const selectLoading = (state) => state.group.loading;
