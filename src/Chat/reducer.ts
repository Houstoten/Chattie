import { combineReducers } from 'redux'
import * as actionTypes from './types';
import * as mActionTypes from '../Message/types'
import { Data, mock } from '../Common';

function messages(state = { data: [] as Data[] }, action: actionTypes.ChatActionTypes | mActionTypes.MessageActionTypes) {
    switch (action.type) {
        case (actionTypes.REQUEST_MESSAGES):
            return { ...state, isFetching: true };
        case (actionTypes.RESPONSE_MESSAGES):
            return { data: action.data, isFetching: false, error: action.error };
        case (actionTypes.INVALIDATE_MESSAGES):
            return { data: [] }
        case (mActionTypes.EDIT_MESSAGE_SHOW):
            return {
                ...state,
                data: state.data.filter(arg => {
                    if (arg.id === action.messageId) {
                        if (arg.isEditing) {
                            arg.isEditing = false;
                        } else {
                            arg.isEditing = true;
                        }
                    }
                    return true;
                })
            }
        case (mActionTypes.LIKE_MESSAGE):
            return ({
                ...state,
                data: state.data.filter(arg => {
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
            })
        case (mActionTypes.DELETE_MESSAGE):
            return ({ ...state, data: state.data.filter(arg => arg.id !== action.messageId) })
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    messages
})

export default rootReducer
