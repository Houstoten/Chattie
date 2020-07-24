import { Data } from "../Common";

export const REQUEST_MESSAGES = "REQUEST_MESSAGES";
export const RESPONSE_MESSAGES = "RESPONSE_MESSAGES";
export const INVALIDATE_MESSAGES = "INVALIDATE_MESSAGES";

export interface RequestMessages {
    type: typeof REQUEST_MESSAGES
}

export interface ResponseMessages {
    type: typeof RESPONSE_MESSAGES
    data: Data[]
    error: boolean
}

export interface InvalidateMessages {
    type: typeof INVALIDATE_MESSAGES
}

export type ChatActionTypes = RequestMessages | ResponseMessages | InvalidateMessages;