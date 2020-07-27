import { api } from "../Common";
import { put, takeEvery, all, call } from "redux-saga/effects";
import { REQUEST_MESSAGES } from "../Chat/types";
import axios from 'axios'
import { INPUT_MESSAGE } from "./types";

export function* inputMessage(action: any) {
    try {
        yield call(axios.post, `${api}/messages`, { userId: action.payload.userId, text: action.payload.text });
        yield put({ type: REQUEST_MESSAGES })
    } catch (error) {
        console.log(error);
    }
}

function* watchInputMessage() {
    yield takeEvery(INPUT_MESSAGE, inputMessage);
}

export default function* messageSagas() {
    yield all([
        watchInputMessage()
    ]
    );
}
