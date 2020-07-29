import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import axios from 'axios'
import { EDIT_OR_CREATE_USER, FETCH_USER_DETAILS, FETCH_USER_DETAILS_REQUEST } from './types';
import { REQUEST_MESSAGES } from '../Chat/types';
import { api, usetDetailsInitial } from '../Common';

export function* fetchUserDetails(action: any) {
    try {
        if (action.id) {
            yield* [put({ type: FETCH_USER_DETAILS, payload: Object.assign({}, usetDetailsInitial), editing: false, fetching: true })]
            let userDetailed = yield call(axios.get, `${api}/users/${action.id}`, { headers: yield select((state: any) => state.thisUser.credentials) });
            yield* [put({ type: FETCH_USER_DETAILS, payload: userDetailed.data, editing: true, fetching: false })]
        } else {
            yield put({ type: FETCH_USER_DETAILS, payload: Object.assign({}, usetDetailsInitial), editing: true, fetching: false });
        }
    } catch (error) {
        console.log(error);
    }
}

function* watchUserFetch() {
    yield takeEvery(FETCH_USER_DETAILS_REQUEST, fetchUserDetails);
}

export function* editOrCreateUser(action: any) {
    try {
        yield call(axios.post, `${api}/users/create`, action.payload, { headers: yield select((state: any) => state.thisUser.credentials) });
        yield* [put({ type: FETCH_USER_DETAILS, payload: Object.assign({}, usetDetailsInitial), editing: false, fetching: false }), put({ type: REQUEST_MESSAGES })]
    } catch (error) {
        console.log(error);
    }
}

function* watchUser() {
    yield takeEvery(EDIT_OR_CREATE_USER, editOrCreateUser);
}

export default function* userOpsSagas() {
    yield all([
        watchUser(),
        watchUserFetch()
    ]
    );
}
