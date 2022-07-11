import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { PayloadAction } from "@reduxjs/toolkit";
import { AccessToken, LoginManager, LoginResult } from "react-native-fbsdk-next";
import FBAccessToken from "react-native-fbsdk-next/lib/typescript/src/FBAccessToken";
import { call, fork, put, take } from "redux-saga/effects";
import { authActions, LogginPayload } from "./authSlice";

function* handleLogin(payload: LogginPayload) {
    switch (payload.type) {
        case 'email':
            yield fork(loginWithEmail, payload.email, payload.password);
            break;
        case 'google':
            yield fork(loginWithGoogle);
            break;
        case 'facebook':
            yield fork(loginWithFacebook);
            break;
        case 'signup':
            yield fork(signUp, payload.email, payload.password);
            break;
    }

}

function* loginWithEmail(email: string, password: string) {
    try {
        yield call([auth(), 'signInWithEmailAndPassword'], email, password);
        yield put(authActions.loginSuccess({
            uid: auth().currentUser?.uid,
            email: auth().currentUser?.email
        }))
    } catch (error) {
        let errorMessage = "Failed to Login with email";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log(errorMessage);
    }
}

function* loginWithGoogle() {
    GoogleSignin.configure({
        webClientId: '504738882802-oo8l931hqhg0u6s4pu8gl957ok2rsvdi.apps.googleusercontent.com',
    });
    try {
        const { idToken } = yield call([GoogleSignin, 'signIn']);
        const googleCredential: FirebaseAuthTypes.AuthCredential = yield call([auth.GoogleAuthProvider, 'credential'], idToken);
        yield call([auth(), 'signInWithCredential'], googleCredential);
        yield put(authActions.loginSuccess({
            uid: auth().currentUser?.uid,
            email: auth().currentUser?.email
        }))
    } catch (error: FirebaseAuthTypes.NativeFirebaseAuthError | unknown) {
        let errorMessage = "Failed to Login with Google";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log(errorMessage);
    }
}

function* loginWithFacebook() {
    try {
        const result: LoginResult = yield call([LoginManager, 'logInWithPermissions'], (['public_profile', 'email']));

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        const data: FBAccessToken = yield call([AccessToken, 'getCurrentAccessToken']);

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }


        const facebookCredential: FirebaseAuthTypes.AuthCredential = yield call([auth.FacebookAuthProvider, 'credential'], data.accessToken);
        yield call([auth(), 'signInWithCredential'], facebookCredential);
        yield put(authActions.loginSuccess({
            uid: auth().currentUser?.uid,
            email: auth().currentUser?.email
        }))
    } catch (error) {
        let errorMessage = "Failed to Login with Facebook";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log(errorMessage);
    }
}

function* signUp(email: string, password: string) {
    try {
        yield call([auth(), 'createUserWithEmailAndPassword'], email, password);
        yield put(authActions.loginSuccess({
            uid: auth().currentUser?.uid,
            email: auth().currentUser?.email
        }))
    } catch (error) {
        let errorMessage = "Failed to SignUp";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log(errorMessage);
    }
}

function* handleLogout() {
    if (auth().currentUser) {
        yield call([auth(), 'signOut']);
    }
    console.log(auth().currentUser)
}

function* checkLoginStatus() {
    if (auth().currentUser) {
        yield put(authActions.loginSuccess({
            uid: auth().currentUser?.uid,
            email: auth().currentUser?.email
        }))
    }
}

function* watchAuthFlow() {
    yield call(checkLoginStatus)
    while (true) {
        if (!auth().currentUser) {
            console.log("WAIT LOGIN")
            const action: PayloadAction<LogginPayload> = yield take(authActions.login.type);
            yield call(handleLogin, action.payload);
        }
        console.log("WAIT LOGOUT")
        yield take([authActions.logOut.type, authActions.loginFailed.type]);
        yield call(handleLogout)
        console.log("DONE")
    }
}

export default function* authSaga() {
    yield fork(watchAuthFlow);
}