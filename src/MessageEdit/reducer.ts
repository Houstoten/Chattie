import { editingMessageInitial } from '../Common';
import { EditMessageTypes, EDIT_MESSAGE_SHOW, EDIT_MESSAGE_SHOW_UNINDEXED, EDIT_MESSAGE_INVALIDATE } from './types';

function edit(state = { editingMessage: editingMessageInitial }, action: EditMessageTypes) {
    switch (action.type) {
        case (EDIT_MESSAGE_SHOW):
            return ({
                ...state,
                editingMessage: action.payload
            });
        case (EDIT_MESSAGE_SHOW_UNINDEXED):
            return ({
                ...state,
                editingMessage: action.payload
            });

        case (EDIT_MESSAGE_INVALIDATE):
            return ({
                ...state,
                editingMessage: action.payload
            });
        default:
            return state;
    }
}

export default edit;
