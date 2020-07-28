import { credentialsInitial } from "../Common";
import { ResponseLogin, RESPONSE_LOGIN } from "./types";


function thisUser(state = { credentials: credentialsInitial }, action: ResponseLogin) {
    switch (action.type) {
        case(RESPONSE_LOGIN):
            return({...state, credentials:action.payload})
        default:
            return state;
    }
}

export default thisUser;