import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { PayloadAction } from "@reduxjs/toolkit";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
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
        yield put(authActions.loginFailed(error.message));
    }
}

function* loginWithGoogle() {
    GoogleSignin.configure({
        webClientId: '504738882802-oo8l931hqhg0u6s4pu8gl957ok2rsvdi.apps.googleusercontent.com',
    });
    try {
        const { idToken } = yield call([GoogleSignin, 'signIn']);
        const googleCredential = yield call([auth.GoogleAuthProvider, 'credential'], idToken);
        yield call([auth(), 'signInWithCredential'], googleCredential);
        yield put(authActions.loginSuccess({
            uid: auth().currentUser?.uid,
            email: auth().currentUser?.email
        }))
    } catch (error) {
        yield put(authActions.loginFailed(error.message));
    }
}

function* loginWithFacebook() {
    try {
        const result = yield call([LoginManager, 'logInWithPermissions'], (['public_profile', 'email']));

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        const data = yield call([AccessToken, 'getCurrentAccessToken']);

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        const facebookCredential = yield call([auth.FacebookAuthProvider, 'credential'], data.accessToken);
        yield call([auth(), 'signInWithCredential'], facebookCredential);
        yield put(authActions.loginSuccess({
            uid: auth().currentUser?.uid,
            email: auth().currentUser?.email
        }))
    } catch (error) {
        yield put(authActions.loginFailed(error.message));
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
        yield put(authActions.loginFailed(error.message));
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