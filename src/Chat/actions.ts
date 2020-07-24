import {
    REQUEST_MESSAGES
    , RequestMessages
    , RESPONSE_MESSAGES
    , ResponseMessages
    , INVALIDATE_MESSAGES
    , InvalidateMessages
} from "./types";
import { Data, errorData } from "../Common";

export const fetchMessages = (url: string) => async (dispatch: any) => {
    console.log('fetch');
    dispatch({ type: INVALIDATE_MESSAGES } as InvalidateMessages);
    dispatch({ type: REQUEST_MESSAGES } as RequestMessages);
    setTimeout(async () => {
        let data: Data[] = [];
        let isError: boolean = false;
        try {
            data = await fetch(url, {
                method: 'GET',
            }).then(response => response.json())
                .catch(() => []);
        } finally {
            if (!data.length) {
                var errData = Object.assign({}, errorData);
                errData.createdAt = new Date(Date.now()).toString();
                data.push(errData);
                isError = true;
            }
            dispatch({ type: RESPONSE_MESSAGES, data: data, error: isError } as ResponseMessages);
        }
    }, 5000);
};