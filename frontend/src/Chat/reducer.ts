import * as actionTypes from './types';
import * as mActionTypes from '../Message/types'
import * as iActionTypes from '../MessageInput/types'
import * as eActionTypes from '../MessageEdit/types'
import { Data, mock } from '../Common';

function messages(state = { data: [] as Data[], thisUserId: mock.userId as string }
    , action: actionTypes.ChatActionTypes | mActionTypes.MessageActionTypes | iActionTypes.InputMessage | eActionTypes.EditMessageSave) {
    switch (action.type) {

        case (actionTypes.REQUEST_MESSAGES):
            return { ...state, isFetching: true };

        case (actionTypes.RESPONSE_MESSAGES):
            return { ...state, data: action.data, isFetching: false, error: action.error };

        case (actionTypes.INVALIDATE_MESSAGES):
            return { ...state, data: [] }

        case (eActionTypes.EDIT_MESSAGE_SAVE):
            return ({
                ...state, data: action.payload
            });

        default:
            return state;
    }
}

export default messages
