export const EDIT_MESSAGE_SHOW = "EDIT_MESSAGE_SHOW";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const LIKE_MESSAGE = "LIKE_MESSAGE";

export interface EditMessageShow {
    type: typeof EDIT_MESSAGE_SHOW
    messageId: string
}

export interface DeleteMessage {
    type: typeof DELETE_MESSAGE
    messageId: string
}

export interface LikeMessage {
    type: typeof LIKE_MESSAGE
    messageId: string
    likerId: string
}

export type MessageActionTypes = EditMessageShow | DeleteMessage | LikeMessage;
