import { Data } from "../Common";

export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const LIKE_MESSAGE = "LIKE_MESSAGE";

export interface DeleteMessage {
    type: typeof DELETE_MESSAGE
    payload: Data[]
}

export interface LikeMessage {
    type: typeof LIKE_MESSAGE
    payload: Data[]
}

export type MessageActionTypes = DeleteMessage | LikeMessage;
