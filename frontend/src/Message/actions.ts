import { LikeMessage, LIKE_MESSAGE, DeleteMessage, DELETE_MESSAGE } from "./types"
import { Data, mock } from "../Common";

export const likeMessage = (messageId: string, likerId: string) => (dispatch: any, getState: any) => {
    dispatch({
        type: LIKE_MESSAGE,
        payload: Object.assign([] as Data[], getState().messages.data).filter((arg: { id: string; userId: string; likes: any[]; }) => {
            if (arg.id === messageId && arg.userId !== mock.userId) {
                if (arg.likes?.find((e: any) => e === likerId)) {
                    arg.likes = arg.likes.filter((ee: any) => ee !== likerId)
                } else {
                    if (arg.likes) {
                        arg.likes.push(likerId);
                    } else {
                        arg.likes = [likerId];
                    }
                }
            }
            return true;
        })
    } as LikeMessage)
}

export const deleteMessage = (messageId: string) => (dispatch: any, getState: any) => {
    dispatch({
        type: DELETE_MESSAGE,
        payload: getState().messages.data.filter((arg: { id: string; }) => arg.id !== messageId)
    } as DeleteMessage)
}
