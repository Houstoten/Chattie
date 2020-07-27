import { EDIT_MESSAGE_SAVE, EDIT_MESSAGE_INVALIDATE, EditMessageSave, EditMessageInvalidate, EDIT_MESSAGE_SHOW, EDIT_MESSAGE_SHOW_UNINDEXED } from "./types"
import { mock, editingMessageInitial } from "../Common";

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

export const editMessageSave = (messageId: string, message: string) => (dispatch: any, getState: any) => {
    dispatch({
        type: EDIT_MESSAGE_SAVE,
        payload: getState().messages.data.filter((el: { id: string; userId: string; text: string; editedAt: string; }) => {
            if (el.id === messageId && el.userId === mock.userId && el.text !== message) {
                el.text = message
                el.editedAt = new Date(Date.now()).toString();
            }
            return true;
        })
    } as EditMessageSave)
}

export const editMessageInvalidateAndClose = (messageId: string) => (dispatch: any) => {
    dispatch({
        type: EDIT_MESSAGE_INVALIDATE,
        payload: Object.assign({}, editingMessageInitial)
    } as EditMessageInvalidate)
}
