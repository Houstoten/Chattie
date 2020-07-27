import { call, put, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios'
import { api, mock, editingMessageInitial } from '../Common'
import { EDIT_MESSAGE_SHOW, EDIT_MESSAGE_SHOW_UNINDEXED, EDIT_MESSAGE_SHOW_RECEIVED, EDIT_MESSAGE_INVALIDATE, EDIT_MESSAGE_SAVE_REQUEST, EDIT_MESSAGE_INVALIDATE_REQUEST } from './types';
import { REQUEST_MESSAGES } from '../Chat/types';

export function* editMessageInvalidate() {
    yield put({
        type: EDIT_MESSAGE_INVALIDATE,
        payload: Object.assign({}, editingMessageInitial)
    })
}

function* watchEditMessagesInvalidate() {
    yield takeEvery([EDIT_MESSAGE_INVALIDATE_REQUEST], editMessageInvalidate);
}

export function* editMessageSave(action: any) {
    try {
        yield call(axios.put, `${api}/messages`, { messageId: action.messageId, text: action.message });
        yield* [put({
            type: EDIT_MESSAGE_INVALIDATE_REQUEST
        }), put({ type: REQUEST_MESSAGES })]
    } catch (error) {
        console.log(error);
    }
}

function* watchEditMessagesSave() {
    yield takeEvery([EDIT_MESSAGE_SAVE_REQUEST], editMessageSave);
}

export function* editMessageShow(action: any) {
    try {
        let message;
        if (action.messageId) {
            message = (yield call(axios.get, `${api}/messages/${action.messageId}`)).data;
        } else {
            let messagesReceived = yield call(axios.get, `${api}/messages`, { params: { userId: mock.userId } });
            messagesReceived.data
                .sort((a: { createdAt: Date; }, b: { createdAt: Date; }) => {
                    return (action.head
                        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                });
            message = messagesReceived.data[0]
        }
        yield put({ type: EDIT_MESSAGE_SHOW_RECEIVED, payload: { messageId: message.id, message: message.text } })
    } catch (error) {
        console.log(error);
    }
}

function* watchEditMessages() {
    yield takeEvery([EDIT_MESSAGE_SHOW, EDIT_MESSAGE_SHOW_UNINDEXED], editMessageShow);
}

export default function* editMessageSagas() {
    yield all([
        watchEditMessages(),
        watchEditMessagesSave(),
        watchEditMessagesInvalidate()
    ]
    );
}
