import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import axios from 'axios'
import { api, errorData, Data } from '../Common'
import { RESPONSE_MESSAGES, REQUEST_MESSAGES } from './types';

export function* fetchMessages() {
    try {
        const messages = yield call(axios.get, `${api}/messages`, { headers: yield select((state: any) => state.thisUser.credentials) });
        messages.data.sort((a: { createdAt: Date; }, b: { createdAt: Date; }) => {
            return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        });
        yield put({ type: RESPONSE_MESSAGES, data: messages.data, isError: false })
    } catch (error) {
        let data: Data[] = [];
        var errData = Object.assign({}, errorData);
        errData.createdAt = new Date(Date.now()).toString();
        data.push(errData);
        yield put({ type: RESPONSE_MESSAGES, data: data, isError: true })
    }
}

function* watchFetchMessages() {
    yield takeEvery(REQUEST_MESSAGES, fetchMessages);
}

export default function* messageSagas() {
    yield all([
        watchFetchMessages()
    ]
    );
}
