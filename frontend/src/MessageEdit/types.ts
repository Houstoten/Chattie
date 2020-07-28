import { Data } from "../Common";

export const EDIT_MESSAGE_SHOW = "EDIT_MESSAGE_SHOW";
export const EDIT_MESSAGE_SHOW_UNINDEXED = "EDIT_MESSAGE_SHOW_UNINDEXED";
export const EDIT_MESSAGE_SHOW_RECEIVED = "EDIT_MESSAGE_SHOW_RECEIVED";
export const EDIT_MESSAGE_SAVE = "EDIT_MESSAGE_SAVE";
export const EDIT_MESSAGE_SAVE_REQUEST = "EDIT_MESSAGE_SAVE_REQUEST";
export const EDIT_MESSAGE_INVALIDATE = "EDIT_MESSAGE_INVALIDATE";
export const EDIT_MESSAGE_INVALIDATE_REQUEST = "EDIT_MESSAGE_INVALIDATE_REQUEST";


export interface EditMessageSave {
    type: typeof EDIT_MESSAGE_SAVE
    payload: Data
}

export interface EditMessageSaveRequest {
    type: typeof EDIT_MESSAGE_SAVE_REQUEST
    payload: {
        messageId: "",
        message: ""
    }
}

export interface EditMessageInvalidate {
    type: typeof EDIT_MESSAGE_INVALIDATE
    payload: {
        messageId: "",
        message: ""
    }
}

export interface EditMessageInvalidateRequest {
    type: typeof EDIT_MESSAGE_INVALIDATE_REQUEST
}

export interface EditMessageShow {
    type: typeof EDIT_MESSAGE_SHOW
    payload: {
        messageId: string
        message: string
    }
}

export interface EditMessageShowUnindexed {
    type: typeof EDIT_MESSAGE_SHOW_UNINDEXED
    payload: {
        messageId: string
        message: string
    }//if true edit head. if false - tail
}

export interface EditMessageShowReceived {
    type: typeof EDIT_MESSAGE_SHOW_RECEIVED
    payload: {
        messageId: string
        message: string
    }
}

export type EditMessageTypes = EditMessageSave | EditMessageInvalidate | EditMessageShowReceived;
