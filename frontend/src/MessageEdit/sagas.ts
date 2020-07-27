import { call, put, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios'
import { api, mock } from '../Common'
import { EDIT_MESSAGE_SHOW, EDIT_MESSAGE_SHOW_UNINDEXED, EDIT_MESSAGE_SHOW_RECEIVED } from './types';

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
                        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
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
        watchEditMessages()
    ]
    );
}
