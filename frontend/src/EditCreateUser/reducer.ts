import { usetDetailsInitial } from "../Common";
import { FETCH_USER_DETAILS, FetchUserDetails, FetchUserDetailsRequest } from "./types";


function userEditCreate(state = { details: usetDetailsInitial, editing: false }, action: FetchUserDetails | FetchUserDetailsRequest) {
    switch (action.type) {
        case (FETCH_USER_DETAILS):
            return ({ ...state, details: action.payload, editing: action.editing })
        default:
            return state;
    }
}

export default userEditCreate;