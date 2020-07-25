import { INPUT_MESSAGE, InputMessage } from "./types"

export const inputMessage = (message: string) => (dispatch: any) => {
    dispatch({
        type: INPUT_MESSAGE,
        message: message
    } as InputMessage)
}