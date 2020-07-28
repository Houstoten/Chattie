export const EDIT_OR_CREATE_USER = "EDIT_OR_CREATE_USER";
export const FETCH_USER_DETAILS = "FETCH_USER_DETAILS";
export const FETCH_USER_DETAILS_REQUEST = "FETCH_USER_DETAILS_REQUEST";

export interface EditOrCreateUser {
    type: typeof EDIT_OR_CREATE_USER
    payload: {
        username: string
        password: string
        avatar: string
        admin: boolean
    }
}

export interface FetchUserDetails {
    type: typeof FETCH_USER_DETAILS
    payload: {
        name: string
        password: string
        avatar: string
        admin: boolean
    }
    editing: boolean
}

export interface FetchUserDetailsRequest {
    type: typeof FETCH_USER_DETAILS_REQUEST
    id: string
}
