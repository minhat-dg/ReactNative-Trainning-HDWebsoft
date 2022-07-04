import {all} from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import groupSaga from '../features/group/groupSaga';
import noteSaga from '../features/note/noteSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        groupSaga(),
        noteSaga()
    ])
}