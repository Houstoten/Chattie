import { EDIT_MESSAGE_SAVE, EDIT_MESSAGE_INVALIDATE, EditMessageSave, EditMessageInvalidate } from "./types"

export const editMessageSave = (messageId: string, message: string) => (dispatch: any) => {
    dispatch({
        type: EDIT_MESSAGE_SAVE,
        message: message,
        messageId: messageId
    } as EditMessageSave)
}

export const editMessageInvalidateAndClose = (messageId: string) => (dispatch: any) => {
    dispatch({
        type: EDIT_MESSAGE_INVALIDATE,
        messageId: messageId
    } as EditMessageInvalidate)
}
