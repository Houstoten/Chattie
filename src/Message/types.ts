export const EDIT_MESSAGE_SHOW = "EDIT_MESSAGE_SHOW";
export const EDIT_MESSAGE_SHOW_UNINDEXED = "EDIT_MESSAGE_SHOW_UNINDEXED";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const LIKE_MESSAGE = "LIKE_MESSAGE";

export interface EditMessageShow {
    type: typeof EDIT_MESSAGE_SHOW
    messageId: string
}

export interface EditMessageShowUnindexed {
    type: typeof EDIT_MESSAGE_SHOW_UNINDEXED
    head: boolean//if true edit head. if false - tail
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

export type MessageActionTypes = EditMessageShow | DeleteMessage | LikeMessage | EditMessageShowUnindexed;
