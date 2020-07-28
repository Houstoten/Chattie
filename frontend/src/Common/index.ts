export interface Data {
    id: string,
    text: string,
    user: string,
    avatar: string,
    userId: string,
    editedAt: string,
    createdAt: string,
    likes?: string[]
}

export const errorData: Data = {
    id: "",
    user: "Error",
    avatar: "",
    userId: "---",
    editedAt: "",
    text: "If you see this message, it is an error to load data. Try again later.",
    createdAt: ""
}

export const mock: Data = {
    id: "",
    user: "Katy",
    avatar: "https://thispersondoesnotexist.com/image",
    userId: "5328dba1-1b8f-11e8-9629-c7eca82aa7bd",
    editedAt: "",
    text: "",
    createdAt: ""
}

export const credentialsInitial = {
    id: null,
    token: null,
    admin: null
}

export const editingMessageInitial = {
    messageId: "",
    message: ""
}

export const api = "http://localhost:8080/api";
//export const api = "https://bsa-husarov-chattie-backend.herokuapp.com/api";
