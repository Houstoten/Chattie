import { call, put, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios'
import { DELETE_MESSAGE_REQUEST, LIKE_MESSAGE } from './types';
import { REQUEST_MESSAGES } from '../Chat/types';
import { api } from '../Common';

export function* likeMessage(action: any) {
    try {
        const formData = new FormData();
        formData.append("userId", action.likerId);
        yield call(axios.put, `${api}/messages/like/${action.messageId}`, formData);
        yield* [put({ type: REQUEST_MESSAGES })]
    } catch (error) {
        console.log(error);
    }
}

function* watchLikeMessage() {
    yield takeEvery(LIKE_MESSAGE, likeMessage);
}

export function* deleteMessage(action: any) {
    try {
        yield call(axios.delete, `${api}/messages/${action.messageId}`);
        yield* [put({ type: REQUEST_MESSAGES })]
    } catch (error) {
        console.log(error);
    }
}

function* watchDeleteMessage() {
    yield takeEvery(DELETE_MESSAGE_REQUEST, deleteMessage);
}

export default function* messageOperationSagas() {
    yield all([
        watchDeleteMessage(),
        watchLikeMessage()
    ]
    );
}
