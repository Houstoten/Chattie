import { credentialsInitial } from "../Common";

export const REQUEST_LOGIN = "REQUEST_LOGIN";

export interface RequestLogin {
    type: typeof REQUEST_LOGIN
    username: string
    password: string
}

export const RESPONSE_LOGIN = "RESPONSE_LOGIN";

export interface ResponseLogin {
    type: typeof RESPONSE_LOGIN
    payload: typeof credentialsInitial
}
