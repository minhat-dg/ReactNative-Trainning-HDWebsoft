import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export interface AuthState {
    isLoggedIn: boolean,
    logging?: boolean,
    currentUser?: User
}

export interface LogginPayload {
    type: string,
    email: string,
    password: string
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action: PayloadAction<LogginPayload>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false
        },
        logOut(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    }
});



//Reducer
const authReducer = authSlice.reducer;
export default authReducer;

//Actions
export const authActions = authSlice.actions;

//Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.isLogging;