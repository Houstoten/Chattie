import { combineReducers } from 'redux'
import * as actionTypes from './types';
import * as mActionTypes from '../Message/types'
import * as iActionTypes from '../MessageInput/types'
import * as eActionTypes from '../MessageEdit/types'
import { Data, mock } from '../Common';
import { uuidv4 } from '../utils/UUIDv4';

const editingMessageInitial = {
    messageId: "",
    message: ""
}

function messages(state = { data: [] as Data[], thisUserId: mock.userId as string, editingMessage: editingMessageInitial }
    , action: actionTypes.ChatActionTypes | mActionTypes.MessageActionTypes | iActionTypes.InputMessage | eActionTypes.EditMessageTypes) {
    switch (action.type) {
        case (actionTypes.REQUEST_MESSAGES):
            return { ...state, isFetching: true };
        case (actionTypes.RESPONSE_MESSAGES):
            return { ...state, data: action.data, isFetching: false, error: action.error };
        case (actionTypes.INVALIDATE_MESSAGES):
            return { ...state, data: [] }
        case (mActionTypes.EDIT_MESSAGE_SHOW):
            return ({
                ...state,
                editingMessage: {
                    messageId: action.messageId,
                    message: state.data.find(el => el.id === action.messageId)?.text
                }
            });
        case (mActionTypes.LIKE_MESSAGE):
            return ({
                ...state,
                data: Object.assign([] as Data[], state.data).filter(arg => {
                    if (arg.id === action.messageId && arg.userId !== mock.userId) {
                        if (arg.likes?.find(e => e === action.likerId)) {
                            arg.likes = arg.likes.filter(ee => ee !== action.likerId)
                        } else {
                            if (arg.likes) {
                                arg.likes.push(action.likerId);
                            } else {
                                arg.likes = [action.likerId];
                            }
                        }
                    }
                    return true;
                })
            });

        case (mActionTypes.DELETE_MESSAGE):
            return ({ ...state, data: state.data.filter(arg => arg.id !== action.messageId) });

        case (iActionTypes.INPUT_MESSAGE):
            let mockCopy = Object.assign({}, mock);
            mockCopy.id = uuidv4();
            mockCopy.createdAt = new Date(Date.now()).toString();
            mockCopy.text = action.message;
            return ({ ...state, data: state.data.concat(mockCopy) });

        case (eActionTypes.EDIT_MESSAGE_SAVE):
            return ({
                ...state, data: state.data.filter(el => {
                    if (el.id === action.messageId && el.userId === mock.userId) {
                        el.text = action.message
                    }
                    return true;
                })
            });

        case (eActionTypes.EDIT_MESSAGE_INVALIDATE):
            return ({
                ...state,
                editingMessage: Object.assign({}, editingMessageInitial)
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    messages
})

export default rootReducer
