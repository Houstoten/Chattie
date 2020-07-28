import {
    REQUEST_MESSAGES
    , RequestMessages
} from "./types";

export const fetchMessages = () => {
    return ({ type: REQUEST_MESSAGES } as RequestMessages);
}