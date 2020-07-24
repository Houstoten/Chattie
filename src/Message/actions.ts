import { EditMessageShow, EDIT_MESSAGE_SHOW, LikeMessage, LIKE_MESSAGE, DeleteMessage, DELETE_MESSAGE } from "./types"

export const editMessageShow = (messageId: string) => (dispatch: any) => {
    dispatch({
        type: EDIT_MESSAGE_SHOW,
        messageId: messageId
    } as EditMessageShow)
}

export const likeMessage = (messageId: string, likerId: string) => (dispatch: any) => {
    dispatch({
        type: LIKE_MESSAGE,
        messageId: messageId,
        likerId: likerId
    } as LikeMessage)
}

export const deleteMessage = (messageId: string) => (dispatch: any) => {
    dispatch({
        type: DELETE_MESSAGE,
        messageId: messageId
    } as DeleteMessage)
}
