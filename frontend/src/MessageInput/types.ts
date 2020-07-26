import { Data } from "../Common";

export const INPUT_MESSAGE = "INPUT_MESSAGE";

export interface InputMessage {
    type: typeof INPUT_MESSAGE
    payload: Data
}
