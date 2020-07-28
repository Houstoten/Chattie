import {  EDIT_MESSAGE_SHOW, EDIT_MESSAGE_SHOW_UNINDEXED, EDIT_MESSAGE_SAVE_REQUEST, EDIT_MESSAGE_INVALIDATE_REQUEST } from "./types"

export const editMessageShow = (messageId: string) => {
    return ({
        type: EDIT_MESSAGE_SHOW,
        messageId: messageId,

    })
}

export const editMessageShowUnindexed = (head: boolean) => {
    return ({
        type: EDIT_MESSAGE_SHOW_UNINDEXED,
        head: head
    })
}

export const editMessageSave = (messageId: string, message: string) => {
    return{
        type: EDIT_MESSAGE_SAVE_REQUEST,
        message: message,
        messageId: messageId
    };
}

export const editMessageInvalidateAndClose =()=> {
    return{
        type: EDIT_MESSAGE_INVALIDATE_REQUEST
    }
}
