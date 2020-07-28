export const DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST";
export const LIKE_MESSAGE = "LIKE_MESSAGE";

export interface DeleteMessageRequest {
    type: typeof DELETE_MESSAGE_REQUEST
    messageId: string
}

export interface LikeMessage {
    type: typeof LIKE_MESSAGE
    messageId: string
    likerId: string
}

export type MessageActionTypes = DeleteMessageRequest | LikeMessage;
