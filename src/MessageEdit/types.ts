
export const EDIT_MESSAGE_SAVE = "EDIT_MESSAGE_SAVE";
export const EDIT_MESSAGE_INVALIDATE = "EDIT_MESSAGE_INVALIDATE";

export interface EditMessageSave {
    type: typeof EDIT_MESSAGE_SAVE
    messageId: string
    message: string
}

export interface EditMessageInvalidate {
    type: typeof EDIT_MESSAGE_INVALIDATE
    messageId: string
}

export type EditMessageTypes = EditMessageSave | EditMessageInvalidate;
