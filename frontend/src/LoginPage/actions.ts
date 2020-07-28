import { RequestLogin, REQUEST_LOGIN } from "./types";

export const login = (username: string, password: string) => {
    return ({ type: REQUEST_LOGIN, username: username, password: password } as RequestLogin);
}