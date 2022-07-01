import {all} from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import groupSaga from '../features/group/groupSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        groupSaga(),
    ])
}