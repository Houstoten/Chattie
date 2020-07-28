import { call, put, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios'
import { api, credentialsInitial } from '../Common'
import { REQUEST_LOGIN, RESPONSE_LOGIN } from './types';

export function* login(action: any) {
    try {
        const credentials = yield call(axios.post, `${api}/users/login`, { username: action.username, password: action.password });
        yield put({ type: RESPONSE_LOGIN, payload: credentials.data })
    } catch (error) {
        yield put({ type: RESPONSE_LOGIN, payload: credentialsInitial })
    }
}

function* watchLogin() {
    yield takeEvery(REQUEST_LOGIN, login);
}

export default function* loginSagas() {
    yield all([
        watchLogin()
    ]
    );
}
