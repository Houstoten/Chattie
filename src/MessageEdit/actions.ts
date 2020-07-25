import { EDIT_MESSAGE_SAVE, EDIT_MESSAGE_INVALIDATE, EditMessageSave, EditMessageInvalidate, EDIT_MESSAGE_SHOW, EditMessageShow, EDIT_MESSAGE_SHOW_UNINDEXED, EditMessageShowUnindexed } from "./types"
import { mock, editingMessageInitial, Data } from "../Common";

export const editMessageShow = (messageId: string) => (dispatch: any, getState: any) => {
    dispatch({
        type: EDIT_MESSAGE_SHOW,
        payload: {
            messageId: messageId,
            message: getState().messages.data.find((el: { id: any }) => el.id === messageId)?.text
        }
    } as EditMessageShow)
}

export const editMessageShowUnindexed = (head: boolean) => (dispatch: any, getState: any) => {
    let messageToEdit: Data | undefined;
    if (head) {
        messageToEdit = getState().messages.data.find((data: { userId: any; }) => data.userId === mock.userId);
    } else {
        messageToEdit = Object.assign([] as Data[], getState().messages.data).reverse().find((data: { userId: string; }) => data.userId === mock.userId);
    }
    dispatch({
        type: EDIT_MESSAGE_SHOW_UNINDEXED,
        payload: {
            messageId: messageToEdit ? messageToEdit.id : editingMessageInitial.messageId,
            message: messageToEdit ? messageToEdit.text : editingMessageInitial.message
        }
    } as EditMessageShowUnindexed)
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
