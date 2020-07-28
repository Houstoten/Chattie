import { editingMessageInitial } from '../Common';
import { EditMessageTypes, EDIT_MESSAGE_INVALIDATE, EDIT_MESSAGE_SHOW_RECEIVED } from './types';

function edit(state = { editingMessage: editingMessageInitial }, action: EditMessageTypes) {
    switch (action.type) {
        case (EDIT_MESSAGE_SHOW_RECEIVED):
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
