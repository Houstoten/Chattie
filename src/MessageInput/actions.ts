import { INPUT_MESSAGE, InputMessage } from "./types"
import { mock } from "../Common";
import { uuidv4 } from "../utils/UUIDv4";

export const inputMessage = (message: string) => (dispatch: any) => {
    let mockCopy = Object.assign({}, mock);
    mockCopy.id = uuidv4();
    mockCopy.createdAt = new Date(Date.now()).toString();
    mockCopy.text = message;
    dispatch({
        type: INPUT_MESSAGE,
        payload: mockCopy
    } as InputMessage)
}