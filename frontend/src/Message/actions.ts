import { LIKE_MESSAGE, DELETE_MESSAGE_REQUEST } from "./types"

export const likeMessage = (messageId: string, likerId: string) => {
    return {
        type: LIKE_MESSAGE,
        messageId: messageId,
        likerId: likerId
    }
}

export const deleteMessage = (messageId: string) => {
    return {
        type: DELETE_MESSAGE_REQUEST,
        messageId: messageId
    }
}
