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
    user: "Daniel",
    avatar: "https://thispersondoesnotexist.com/image",
    userId: "2c34b119-eda4-4dfa-84b8-27bf1a18b0d9",
    editedAt: "",
    text: "",
    createdAt: ""
}

export const editingMessageInitial = {
    messageId: "",
    message: ""
}
