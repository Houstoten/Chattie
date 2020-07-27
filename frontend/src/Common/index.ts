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
    userId: "c499274c-4116-40c0-8efe-1a652219df5f",
    editedAt: "",
    text: "",
    createdAt: ""
}

export const editingMessageInitial = {
    messageId: "",
    message: ""
}

export const api = "https://bsa-husarov-chattie-backend.herokuapp.com/api";
