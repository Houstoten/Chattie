import { EditOrCreateUser, EDIT_OR_CREATE_USER, FETCH_USER_DETAILS_REQUEST } from './types'

export const openUserEditCreate = (id: string | null) => {
    return {
        type: FETCH_USER_DETAILS_REQUEST,
        id: id
    }
}

export const editOrCreateUser = (payload: EditOrCreateUser["payload"]) => {
    return {
        type: EDIT_OR_CREATE_USER,
        payload: payload
    }
}